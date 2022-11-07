import {body} from "express-validator";

export const nameValidation = body('name').trim().isLength({min:1, max: 15}).isString()
export const youtubeUrlValidation = body('youtubeUrl').trim().isLength({min:1, max: 100}).isString().matches(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/)

