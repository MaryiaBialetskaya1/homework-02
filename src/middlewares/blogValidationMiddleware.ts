import {body} from "express-validator";

const nameValidation = body('name')
    .isString().withMessage('invalid name isString')
    .trim().withMessage('invalid name trim')
   // .notEmpty().withMessage('invalid name notEmpty')
    .isLength({ max: 15 }).withMessage('invalid name isLength')

const youtubeUrlValidation = body('youtubeUrl').trim().isLength({min:1, max: 100}).isString().matches(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/)
// const youtubeUrlValidation = body('youtubeUrl')
//     .isString().withMessage('invalid youtubeUrl isString')
//     .trim().withMessage('invalid youtubeUrl trim')
//     .notEmpty().withMessage('invalid youtubeUrl notEmpty')
//     .isLength({ max: 100 }).withMessage('invalid youtubeUrl isLength')
//     .isURL().withMessage('invalid isURL');

export {nameValidation, youtubeUrlValidation};