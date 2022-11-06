import {body} from "express-validator";

const nameValidation = body('name')
    .isString().withMessage('name should be string')
    .trim().withMessage('name should be symbols string')
    .notEmpty().withMessage('name is required')
    .isLength({ max: 15 }).withMessage('max length of name is 15');

const youtubeUrlValidation = body('youtubeUrl')
    .isString().withMessage('youtubeUrl should be string')
    .trim().withMessage('youtubeUrl should be symbols string')
    .notEmpty().withMessage('youtubeUrl is required')
    .isLength({ max: 15 }).withMessage('youtubeUrl length of name is 15')
    .isURL().withMessage('youtubeUrl be valid URL');

export {nameValidation, youtubeUrlValidation};