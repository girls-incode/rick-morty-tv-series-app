import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import Character from '../models/character';
import RefreshToken from '../models/token';
import db from '../utils/db';
import { dateTransform } from '../utils/dates';
import HttpException from './../utils/httpException';

const {
    REFRESH_TOKEN_EXPIRATION = '7d',
    ACCESS_TOKEN_EXPIRATION = '15m',
    REFRESH_TOKEN_SECRET = 'jwts',
    ACCESS_TOKEN_SECRET = 'jwts'
} = process.env;

export async function loginService({ email, password }: any) {
    const user:any = await User.findOne({ email });

    if (!user || !bcrypt.compareSync(password, user.password)) {
        throw new HttpException(403, 'Email or password is incorrect');
    }

    return setNewTokens(user);
}

export async function registerService(body:any) {
    if (await User.findOne({ email: body.email })) {
        throw new HttpException(409, 'User already exists');
    }

    const user:any = new User(body);
    user.password = hash(body.password);
    user.favorites = [];
    await user.save();
    return setNewTokens(user);
}

export async function newAccessTokenService(token: string) {
    const oldRefreshToken: any = await RefreshToken.findOne({ token }).populate('user');
    if (!oldRefreshToken || oldRefreshToken.isExpired) throw new HttpException(400, 'Invalid token');
    const { user } = oldRefreshToken;
    const accessToken = generateAccessToken(user);

    return {
        ...userInfo(user),
        accessToken,
        refreshToken: token
    }
}

async function setNewTokens(user: any) {
    const accessToken = generateAccessToken(user);
    const refreshToken: any = generateRefreshToken(user);

    await refreshToken.save();
    return {
        ...userInfo(user),
        accessToken,
        refreshToken: refreshToken.token
    }
}

function generateAccessToken(user: any) {
    return jwt.sign({ sub: user._id, id: user._id }, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRATION });
}

function generateRefreshToken(user: any) {
    return new RefreshToken({
        user: user._id,
        token: jwt.sign({ id: user._id }, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRATION }),
        expires: dateTransform(REFRESH_TOKEN_EXPIRATION),
    });
}

function hash(password:string) {
    return bcrypt.hashSync(password, 10);
}

export async function getUserByIdService(id:any) {
    const user = await getUser(id);
    return user;
}

async function getUser(id:number) {
    if (!db.isValidId(id)) throw 'User not found';
    const user = await User.findById(id);
    if (!user) throw 'User not found';
    return user;
}

function userInfo(user:any) {
    const { _id, name, email, created, favorites } = user;
    return { _id, name, email, created, favorites }
}

export async function logoutService(userId: string) {
    try {
        await RefreshToken.deleteOne({ user: userId });
    } catch (e) { console.log(e) }
}

export async function addFavoriteService(body: any) {
    console.log(body);
    const user: any = await User.findOne({ email: body.email });

    if (!user) {
        throw new HttpException(404, 'User not found');
    }
    const favoriteExists = user.favorites.some((item: any) => item.id === body.data.id);
    if (favoriteExists) throw new HttpException(400, 'The character is already in favorites list');
    try {
        const char = new Character(body.data);
        user.favorites.push(char);
        await user.save();
    } catch (error) {
        throw new HttpException(503, error._message)
    }
    return body.data
}