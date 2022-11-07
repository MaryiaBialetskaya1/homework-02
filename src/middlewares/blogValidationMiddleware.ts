import {body} from "express-validator";

const nameValidation = body('name')
    .isString().withMessage('invalid name isString')
    .trim().withMessage('invalid name trim')
   // .notEmpty().withMessage('invalid name notEmpty')
    .isLength({ max: 15 }).withMessage('invalid name isLength');


const youtubeUrlValidation = body('youtubeUrl')
    .isString().withMessage('invalid youtubeUrl')
    .trim().withMessage('invalid youtubeUrl')
    .notEmpty().withMessage('invalid youtubeUrl')
    .isLength({ max: 100 }).withMessage('max length of the youtubeUrl is 15')
    .isURL().withMessage('invalid youtubeUrl');

export {nameValidation, youtubeUrlValidation};