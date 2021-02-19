import express, {
    NextFunction,
    Response,
} from 'express';

export default function errorHandler(err: any, req: any, res: Response, next: NextFunction) {
    console.log('____', err.status, err.message);
    if (err.status && err.message) {
        return res.status(err.status).json({ message: err.message });
    }
    if (typeof err === 'string') {
        const is404 = err.toLowerCase().endsWith('not found');
        const statusCode = is404 ? 404 : 400;
        return res.status(statusCode).json({ message: err });
    }
    if (err.name === 'ValidationError') {
        return res.status(400).json({ message: err.message });
    }
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    return res.status(500).json({ message: err.message })
}