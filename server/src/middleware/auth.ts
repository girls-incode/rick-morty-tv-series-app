import express, {
    NextFunction,
    Response,
} from 'express';
import jwt from 'jsonwebtoken';

export function verifyToken(req: any, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(403);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || '', (err:any, user:any) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next()
    })
}