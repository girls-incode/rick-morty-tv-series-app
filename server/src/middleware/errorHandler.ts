import {
    NextFunction,
    Request,
    Response
} from 'express';

function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    if (err.status && err.message) {
        return res.status(err.status).json({ message: err.message });
    }
    if (err.name === 'ValidationError') {
        return res.status(400).json({ message: err.message });
    }
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    return res.status(500).json({ message: err.message })
}

export default errorHandler;