
import {validationResult} from "express-validator";
import {NextFunction, Request, Response} from "express";

export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) =>{
    const errorsMessages = validationResult(req);
    if (!errorsMessages.isEmpty()) {
        res.status(400).json({ errorsMessages: errorsMessages.array() });
    } else{
        next()
    }
}