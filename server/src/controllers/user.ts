import express, {
    NextFunction,
    Request,
    Response,
} from 'express';
import Joi from 'joi';
import { validateRequest } from '../middleware/http';
import { verifyToken } from '../middleware/auth';
import {
    loginService,
    getUserByIdService,
    registerService,
    logoutService,
    newAccessTokenService
} from '../services/user';
import { dateTransform } from '../utils/dates';
import HttpException from './../utils/httpException';

const {
    REFRESH_TOKEN_EXPIRATION = '7d',
} = process.env;

const router = express.Router();

router.post('/login', loginSchema, login);
router.post('/register', registerSchema, register);
router.post('/refresh-token', refreshToken);
router.post('/logout', verifyToken, logout);
router.get('/:id', verifyToken, getById);

function loginSchema(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    });

    validateRequest(req, next, schema);
}

function login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    loginService({ email, password })
        .then(({ refreshToken, ...user }: any) => {
            setTokenCookie(res, refreshToken);
            res.json(user);
        })
        .catch(next);
}

function registerSchema(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    });
    validateRequest(req, next, schema);
}

function register(req: Request, res: Response, next: NextFunction) {
    registerService(req.body)
        .then(({ refreshToken, ...user }: any) => {
            setTokenCookie(res, refreshToken);
            res.json(user);
        })
        .catch(next);
}

function setTokenCookie(res: Response, token: string) {
    try {
        const cookieOptions = {
            httpOnly: true,
            expires: dateTransform(REFRESH_TOKEN_EXPIRATION)
        };
        res.cookie('refreshToken', token, cookieOptions);
    } catch (err) {
        console.log(err);
    }
}

function getById(req: any, res: Response, next: NextFunction) {
    if (req.params.id !== req.user.id) {
        return next(new HttpException(401, 'Unauthorized'))
    }

    getUserByIdService(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(next);
}

function logout(req: any, res: Response, next: NextFunction) {
    logoutService(req.user.id).then(() => {
        res.clearCookie('refreshToken');
        res.status(200).json('Logout success')
    }).catch(next);
}

function refreshToken(req: any, res: Response, next: NextFunction) {
    const token = req.cookies.refreshToken;
    if (!token) next(new HttpException(400, 'Invalid token'));
    newAccessTokenService(token)
        .then(({ refreshToken, ...user }: any) => {
            setTokenCookie(res, refreshToken);
            res.json(user);
        })
        .catch(next);
}

export default router;