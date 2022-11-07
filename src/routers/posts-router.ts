import {Request, Response, Router} from "express";
import {postsRepository} from "../repositories/posts-repository";
import {checkAuthorizationMiddleware} from "../middlewares/checkAuthorizationMiddleware";
import {inputValidationMiddleware} from "../middlewares/inputValidationMiddleware";
import {
    bodyBlogIdValidation,
    contentValidation,
    shortDescriptionValidation,
    titleValidation
} from "../middlewares/validationMiddleware";


export const postsRouter = Router({})

postsRouter.get('/', (req:Request, res: Response) =>{
    const foundPosts = postsRepository.findPosts();
    res.send(foundPosts);
})

postsRouter.get('/:id', (req: Request, res: Response)=>{
    const post = postsRepository.findPostById(req.params.id)
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
    (req:Request, res:Response) =>{
    const newPost = postsRepository.createPost(req.body.title, req.body.shortDescription, req.body.content, req.body.blogId, req.body.blogName);
    if(newPost){
        return res.status(201).send(newPost)
    } else {
        return res.status(401).send({
            "errorsMessages": [
                {
                    "message": "string",
                    "field": "blogId"
                }
            ]
        })
    }

})

postsRouter.put('/:id',
    checkAuthorizationMiddleware,
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    bodyBlogIdValidation,
    inputValidationMiddleware,
    (req: Request, res: Response) =>{
    const isUpdated = postsRepository.updatePost(req.params.id, req.body.title,  req.body.shortDescription, req.body.content, req.body.blogId, req.body.blogName)
    if(isUpdated){
        res.send(204)
    }else{
        res.send(404)
    }
})

postsRouter.delete('/:id',
    checkAuthorizationMiddleware,
    (req: Request, res:Response) => {
        const isDeleted = postsRepository.deletePost(req.params.id)
        if(isDeleted){
            res.send(204)
        } else{
            res.send(404)
        }
    })

