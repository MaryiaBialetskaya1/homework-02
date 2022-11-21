import {Request, Response, Router} from "express";
import {blogsRepository, blogsType} from "../repositories/blogs-repository";
import {descriptionValidation, nameValidation, youtubeUrlValidation} from "../middlewares/validationMiddleware";
import {inputValidationMiddleware} from "../middlewares/inputValidationMiddleware";
import {checkAuthorizationMiddleware} from "../middlewares/checkAuthorizationMiddleware";

export const blogsRouter = Router({})

blogsRouter.get('/', async (req: Request, res: Response) => {
    const foundBlogs: blogsType[] = await blogsRepository.findBlogs();
    res.send(foundBlogs);
})

blogsRouter.get('/:blogId', (req:Request, res:Response) =>{
    const blog = blogsRepository.findBlogById(req.params.blogId)
    if(blog){
        res.send(blog);
    } else{
        res.send(404)
    }
})

blogsRouter.post('/',
    checkAuthorizationMiddleware,
    nameValidation,
    descriptionValidation,
    youtubeUrlValidation,
    inputValidationMiddleware,
    (req:Request ,res: Response) =>{

    const newBlog = blogsRepository.createBlog(req.body.name, req.body.description, req.body.websiteUrl);
    res.status(201).send(newBlog)
})

blogsRouter.put('/:blogId',
    checkAuthorizationMiddleware,
    nameValidation,
    descriptionValidation,
    youtubeUrlValidation,
    inputValidationMiddleware,
    (req:Request, res:Response) => {
        const isUpdated = blogsRepository.updateBlog(req.params.blogId, req.body.name, req.body.description, req.body.websiteUrl)
        if(isUpdated){
            res.send(204)
        } else{
            res.send(404)
        }
})

blogsRouter.delete('/:blogId',
    checkAuthorizationMiddleware,
    (req: Request, res:Response) => {
    const isDeleted = blogsRepository.deleteBlog(req.params.blogId)
    if(isDeleted){
        res.send(204)
    } else{
        res.send(404)
    }
})