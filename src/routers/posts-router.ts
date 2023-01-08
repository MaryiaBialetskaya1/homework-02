import {Request, Response, Router} from "express";
//import {postsRepository} from "../repositories/posts-repository";
//import {postsRepository} from "../repositories/posts-db-repository";
import {postsType} from "../repositories/db";
import {postService} from "../domain/posts-service";
import {checkAuthorizationMiddleware} from "../middlewares/checkAuthorizationMiddleware";
import {inputValidationMiddleware} from "../middlewares/inputValidationMiddleware";
import {
    bodyBlogIdValidation,
    contentValidation,
    shortDescriptionValidation,
    titleValidation
} from "../middlewares/validationMiddleware";
import {postsQueryRepo} from "../repositories/posts-queryRepo";

export const postsRouter = Router({})

postsRouter.get('/', async (req: Request, res: Response) => {
    const foundPosts: postsType[] = await postService.findPosts();
    res.send(foundPosts);
})

postsRouter.get('/:id', async (req: Request, res: Response)=>{
    const post = await postsQueryRepo.findPostById(req.params.id);
    if(post){
        res.status(200).json(post);
    } else{
        res.sendStatus(404);
    }
})

postsRouter.post('/',
    checkAuthorizationMiddleware,
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    bodyBlogIdValidation,
    inputValidationMiddleware,
    async (req:Request, res:Response) =>{
        const newPost = await postService.createPost(req.body.title, req.body.shortDescription, req.body.content, req.body.blogId);
        if (newPost != null) {
            const post = await postsQueryRepo.findPostById(newPost)
            res.status(201).json(post)
        }
})

postsRouter.put('/:id',
    checkAuthorizationMiddleware,
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    bodyBlogIdValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) =>{
    const isUpdated: boolean = await postService.updatePost(req.params.id, req.body.title,  req.body.shortDescription, req.body.content, req.body.blogId);
    if(isUpdated){
        res.sendStatus(204);
    }else{
        res.sendStatus(404);
    }
})

postsRouter.delete('/:id',
    checkAuthorizationMiddleware,
    async (req: Request, res: Response) => {
        const isDeleted = await postService.deletePost(req.params.id);
        if (isDeleted) {
            res.sendStatus(204);
        } else {
            res.sendStatus(404);
        }
})
postsRouter.delete('/',
    checkAuthorizationMiddleware,
    async (req: Request, res: Response) => {
        const isDeleted = await postService.deleteAll();
        if (isDeleted) {
            res.sendStatus(204);
        } else {
            res.sendStatus(404);
        }
    })


