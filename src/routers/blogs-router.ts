import {Request, Response, Router} from "express";
//import {blogsRepository} from "../repositories/blogs-repository"; - in memory
//import {blogsRepository} from "../repositories/blogs-db-repository";
import {blogsService} from "../domain/blogs-service";
import { blogsType} from "../repositories/db"
import {
    contentValidation,
    descriptionValidation,
    nameValidation, shortDescriptionValidation,
    titleValidation,
    youtubeUrlValidation
} from "../middlewares/validationMiddleware";
import {inputValidationMiddleware} from "../middlewares/inputValidationMiddleware";
import {checkAuthorizationMiddleware} from "../middlewares/checkAuthorizationMiddleware";
import {blogsQueryRepo} from "../repositories/blogs-queryRepo";
import {postService} from "../domain/posts-service";
import {postsQueryRepo} from "../repositories/posts-queryRepo";

export const blogsRouter = Router({})

blogsRouter.get('/', async (req: Request, res: Response) => {
    const foundBlogs: blogsType[] = await blogsService.findBlogs()
    res.send(foundBlogs);
})

blogsRouter.get('/:blogId', async (req:Request, res:Response) =>{
    const blog = await blogsQueryRepo.findBlogById(req.params.blogId)
    if(!blog){
        res.send(404)
    } else{
        res.status(200).json(blog)
    }
})

blogsRouter.post('/',
    checkAuthorizationMiddleware,
    nameValidation,
    descriptionValidation,
    youtubeUrlValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {
        const newBlogId = await blogsService.createBlog(req.body.name, req.body.description, req.body.websiteUrl);
        const newBlog = await blogsQueryRepo.findBlogById(newBlogId);
        res.status(201).json(newBlog)
    })

blogsRouter.put('/:blogId',
    checkAuthorizationMiddleware,
    nameValidation,
    descriptionValidation,
    youtubeUrlValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {
        const isUpdated: boolean = await blogsService.updateBlog(req.params.blogId, req.body.name, req.body.description, req.body.websiteUrl)
        if (isUpdated) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    })

blogsRouter.delete('/:blogId',
    checkAuthorizationMiddleware,
    async (req: Request, res:Response) => {
        const isDeleted: boolean = await blogsService.deleteBlog(req.params.blogId)
        if(isDeleted){
            res.send(204)
        } else{
            res.send(404)
        }
    })

blogsRouter.delete('/',
    checkAuthorizationMiddleware,
    async (req: Request, res:Response) => {
        const isDeleted = await blogsService.deleteAll()
        if (!isDeleted) {
            res.send(404)
        } else {
            res.send(204)
        }
    })

blogsRouter.post('/:blogId/posts',
    checkAuthorizationMiddleware,
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {
        const blog = await blogsQueryRepo.findBlogById(req.params.blogId)
        if(!blog){
            res.send(404)
        } else{

            const newPost = await postService.createPost(req.body.title, req.body.shortDescription, req.body.content, req.body.blogId);
            if (newPost != null) {
                const post = await postsQueryRepo.findPostById(newPost)
                res.status(201).json(post)
            }
        }
    })

blogsRouter.get('/:blogId/posts', async (req:Request, res:Response) =>{
    const post = await blogsQueryRepo.findBlogById(req.params.blogId)
    if(!post){
        res.send(404)
    } else{
        res.status(200).json(post)
    }
})



