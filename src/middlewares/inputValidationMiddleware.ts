import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";

export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) =>{
    const errorsMessages = validationResult(req);
    if (!errorsMessages.isEmpty()) {
        res.status(400).json({ errorsMessages: errorsMessages.array() });
    } else{
        next()
    }
}