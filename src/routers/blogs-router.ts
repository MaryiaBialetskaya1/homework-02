import {Request, Response, Router} from "express";
import {blogsRepository} from "../repositories/blogs-repository";
import {nameValidation, youtubeUrlValidation} from "../middlewares/blogValidationMiddleware";
import {inputValidationMiddleware} from "../middlewares/inputValidationMiddleware";

export const blogsRouter = Router({})

blogsRouter.get('/', (req:Request, res: Response) =>{
    const foundBlogs = blogsRepository.findBlogs();
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
    nameValidation,
    youtubeUrlValidation,
    inputValidationMiddleware,
    (req:Request ,res: Response) =>{

    const newBlog = blogsRepository.createBlog(req.body.name, req.body.youtubeUrl);
    res.status(201).send(newBlog)
})

blogsRouter.put('/:blogId', (req:Request, res:Response) => {

    const isUpdated = blogsRepository.updateBlog(req.params.blogId, req.body.name, req.body.youtubeUrl)
    if(isUpdated){
        const blog = blogsRepository.findBlogById(req.params.blogId)
        res.sendStatus(204)
    } else{
        res.sendStatus(404)
    }
})

blogsRouter.delete('/:blogId', (req: Request, res:Response) => {
    const isDeleted = blogsRepository.deleteBlog(req.params.blogId)
    if(isDeleted){
        res.send(204)
    } else{
        res.send(404)
    }
})