import {body} from "express-validator";

const nameValidation = body('name')
    .isString().withMessage('invalid name')
    .trim().withMessage('invalid name')
    .notEmpty().withMessage('invalid name')
    .isLength({ max: 15 }).withMessage('max length of the name is 15');


const youtubeUrlValidation = body('youtubeUrl')
    .isString().withMessage('invalid youtubeUrl')
    .trim().withMessage('invalid youtubeUrl')
    .notEmpty().withMessage('invalid youtubeUrl')
    .isLength({ max: 100 }).withMessage('max length of the youtubeUrl is 15')
    .isURL().withMessage('invalid youtubeUrl');

export {nameValidation, youtubeUrlValidation};