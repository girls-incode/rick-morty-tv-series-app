import express, {
    NextFunction,
    Response,
} from 'express';
import jwt from 'jsonwebtoken';
import HttpException from '../utils/httpException';

export function verifyToken(req: any, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) next(new HttpException(403, 'forbidden'));

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || '', (err:any, user:any) => {
        if (err) next(new HttpException(403, 'incorrect access token'));
        req.user = user;
        next()
    })
}