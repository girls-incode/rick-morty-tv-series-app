import express, {
    NextFunction,
    Request,
} from 'express';

export default function validateRequest(req: Request, next: NextFunction, schema:any) {
    const options = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true
    };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
        next(`Validation error: ${error.details.map((x:any) => x.message).join(', ')}`);
    } else {
        req.body = value;
        next();
    }
}