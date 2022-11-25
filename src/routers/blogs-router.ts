import {Request, Response, Router} from "express";
//import {blogsRepository} from "../repositories/blogs-repository";
import {blogsRepository} from "../repositories/blogs-db-repository";
import { blogsType } from "../repositories/db"
import {descriptionValidation, nameValidation, youtubeUrlValidation} from "../middlewares/validationMiddleware";
import {inputValidationMiddleware} from "../middlewares/inputValidationMiddleware";
import {checkAuthorizationMiddleware} from "../middlewares/checkAuthorizationMiddleware";

export const blogsRouter = Router({})

blogsRouter.get('/', async (req: Request, res: Response) => {
    const foundBlogs: blogsType[] = await blogsRepository.findBlogs();
    res.send(foundBlogs);
})

blogsRouter.get('/:blogId', async (req:Request, res:Response) =>{
    const blog = await blogsRepository.findBlogById(req.params.blogId)
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
    async (req: Request, res: Response) => {

        const newBlog: blogsType = await blogsRepository.createBlog(req.body.name, req.body.description, req.body.websiteUrl);
        res.status(201).send(newBlog)
    })

blogsRouter.put('/:blogId',
    checkAuthorizationMiddleware,
    nameValidation,
    descriptionValidation,
    youtubeUrlValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {
        const isUpdated: boolean = await blogsRepository.updateBlog(req.params.blogId, req.body.name, req.body.description, req.body.websiteUrl)
        if (isUpdated) {
            res.send(204)
        } else {
            res.send(404)
        }
    })

blogsRouter.delete('/:blogId',
    checkAuthorizationMiddleware,
    async (req: Request, res:Response) => {
    const isDeleted: boolean = await blogsRepository.deleteBlog(req.params.blogId)
    if(isDeleted){
        res.send(204)
    } else{
        res.send(404)
    }
})