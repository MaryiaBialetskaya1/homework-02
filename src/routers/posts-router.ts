import {Request, Response, Router} from "express";
import {postsRepository, postsType} from "../repositories/posts-repository";
import {checkAuthorizationMiddleware} from "../middlewares/checkAuthorizationMiddleware";
import {inputValidationMiddleware} from "../middlewares/inputValidationMiddleware";
import {
    bodyBlogIdValidation,
    contentValidation,
    shortDescriptionValidation,
    titleValidation
} from "../middlewares/validationMiddleware";


export const postsRouter = Router({})

postsRouter.get('/', async (req: Request, res: Response) => {
    const foundPosts: postsType[] = await postsRepository.findPosts();
    res.send(foundPosts);
})

postsRouter.get('/:id', async (req: Request, res: Response)=>{
    const post: postsType | null = await postsRepository.findPostById(req.params.id)
    if(post){
        res.send(post);
    } else{
        res.send(404)
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
    const newPost: postsType = await postsRepository.createPost(req.body.title, req.body.shortDescription, req.body.content, req.body.blogId);
    if(newPost){
        return res.status(201).send(newPost)
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
    const isUpdated: boolean = await postsRepository.updatePost(req.params.id, req.body.title,  req.body.shortDescription, req.body.content, req.body.blogId)
    if(isUpdated){
        res.send(204)
    }else{
        res.send(404)
    }
})

postsRouter.delete('/:id',
    checkAuthorizationMiddleware,
    async (req: Request, res: Response) => {
        const isDeleted = await postsRepository.deletePost(req.params.id)
        if (isDeleted) {
            res.send(204)
        } else {
            res.send(404)
        }
    })

