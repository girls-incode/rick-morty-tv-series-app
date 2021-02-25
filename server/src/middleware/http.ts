import express, {
    NextFunction,
    Request,
    Response
} from 'express';
import HttpException from './../utils/httpException';

export function validateRequest(req: Request, res: Response, next: NextFunction, schema: any) {
    const options = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true
    };
    const { error, value } = schema.validate(req.body, options);

    if (error) {
        next(new HttpException(400, `Validation error: ${error.details.map((x: any) => x.message).join(', ')}`));
        // res.status(400).json({ message: `Validation error: ${error.details.map((x: any) => x.message).join(', ')}` })
    } else {
        req.body = value;
        next();
    }
}