import {body} from "express-validator";

export const nameValidation = body('name')
    .trim()
    .isLength({min:1, max: 15})
    .isString()

export const youtubeUrlValidation = body('youtubeUrl')
    .trim().
    isLength({min:1, max: 100})
    .isString()
    .matches(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/)

export const titleValidation = body('title')
    .trim()
    .notEmpty()
    .isLength({max: 300})
    .isString()

export const shortDescriptionValidation = body('shortDescription')
    .trim()
    .notEmpty()
    .isLength({max: 100})
    .isString()

export const contentValidation = body('content')
    .trim()
    .notEmpty()
    .isLength({max:1000})
    .isString()

export const bodyBlogIdValidation = body('blogId')
    .trim()
    .isLength({min: 13, max:13})
    .notEmpty()
    .isString()

