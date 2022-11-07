import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";

export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) =>{
    const errorsMessages = validationResult(req);
    if (!errorsMessages.isEmpty()) {
        return res.status(400).json({ errors: errorsMessages.array() });
    } else{
        next()
    }
}