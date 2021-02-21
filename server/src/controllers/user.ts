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
    tokenService
} from '../services/user';
import HttpException from './../utils/httpException';

const router = express.Router();

router.post('/login', loginSchema, login);
router.post('/register', registerSchema, register);
router.post('/refresh-token', refreshToken);
router.get('/logout', verifyToken, logout);
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
        .then((user) => res.json(user))
        .catch(next);
}

function setTokenCookie(res: Response, token:string) {
    // create cookie with refresh token that expires in 7 days
    const cookieOptions = {
        httpOnly: true,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    };
    res.cookie('refreshToken', token, cookieOptions);
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
    }).catch(next);
}

function refreshToken(req: any, res: Response, next: NextFunction) {
    const token = req.cookies.refreshToken;
    tokenService(token)
        .then(({ refreshToken, ...user }: any) => {
            setTokenCookie(res, refreshToken);
            res.json(user);
        })
        .catch(next);
}

export default router;