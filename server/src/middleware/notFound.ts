import {
    NextFunction,
    Request,
    Response
} from 'express';
import HttpException from '../utils/httpException';

function notFoundHandler(req: Request, res: Response, next: NextFunction) {
    if (!req.route)
        return next(new HttpException(404, 'Not Found'));
    next();
}

export default notFoundHandler;