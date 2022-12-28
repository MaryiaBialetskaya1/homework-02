import {body, CustomValidator, param} from "express-validator";
//import {blogsRepository} from "../repositories/blogs-repository";
import {blogsRepository} from "../repositories/blogs-db-repository";

export const nameValidation = body('name')
    .trim()
    .isLength({min:1, max: 15})
    .isString()

export const descriptionValidation = body('description')
    .trim()
    .notEmpty()
    .isLength({max: 500})
    .isString()

export const youtubeUrlValidation = body('websiteUrl')
    .trim()
    .isLength({min:1, max: 100})
    .isString()
    .matches(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/)

export const titleValidation = body('title')
    .trim()
    .notEmpty()
    .isLength({max: 30})
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


const isValidBlogId : CustomValidator = async value => {
    const blog = await blogsRepository.findBlogById(value.toString());
    if (blog) {
        return true;
    } else {
        return Promise.reject('blog id is not found')
    }
}
export const bodyBlogIdValidation = body('blogId')
    .trim()
    .notEmpty()
    .isString()
    .custom(isValidBlogId)

export const isBlogIdFound = param('blogId')
    .trim()
    .notEmpty()
    .isString()
    .custom(isValidBlogId)


