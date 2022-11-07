
import {validationResult} from "express-validator";
import {NextFunction, Request, Response} from "express";

const myValidationResult = validationResult.withDefaults({
    formatter: error => {
        return{
            message: error.msg,
            field: error.param,
        }
    }
})

export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) =>{
    const errorsMessages = myValidationResult(req);
    if (!errorsMessages.isEmpty()) {
        return res.status(400).json({ errorsMessages: errorsMessages.array() });
    } else{
        next()
    }
}