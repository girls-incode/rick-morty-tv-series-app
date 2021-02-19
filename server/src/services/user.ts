import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import RefreshToken from '../models/token';
import db from '../utils/db';
import HttpException from './../utils/httpException';

export async function loginService({ email, password }: any) {
    const user:any = await User.findOne({ email });

    if (!user || !bcrypt.compareSync(password, user.password)) {
        throw new HttpException(403, 'Email or password is incorrect');
    }

    const jwtToken = generateJwtToken(user);
    const refreshToken:any = generateRefreshToken(user);

    await refreshToken.save();
    return {
        ...userInfo(user),
        jwtToken,
        refreshToken: refreshToken.token
    }
}

export async function registerService(body:any) {
    if (await User.findOne({ email: body.email })) {
        throw new HttpException(409, 'User already exists');
    }

    const user:any = new User(body);
    user.password = hash(body.password);
    user.favorites = [];
    const jwtToken = generateJwtToken(user);
    await user.save();
    const refreshToken: any = generateRefreshToken(user);
    
    await refreshToken.save();
    return {
        ...userInfo(user),
        jwtToken,
        refreshToken: refreshToken.token
    }
}

function generateJwtToken(user:any) {
    return jwt.sign({ sub: user._id, id: user._id }, process.env.ACCESS_TOKEN_SECRET || '', { expiresIn: '30m' });
}

function generateRefreshToken(user:any) {
    // expires in 7 days
    return new RefreshToken({
        user: user._id,
        token: jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET || '', { expiresIn: '7d' }),
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
}

function randomTokenString() {
    return crypto.randomBytes(64).toString('hex');
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
    await RefreshToken.deleteOne({ user: userId });
}