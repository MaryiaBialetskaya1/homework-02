import {Request, Response, Router} from "express";
import {blogsRepository} from "../repositories/blogs-repository";
import {postsRepository} from "../repositories/posts-repository";

export const postsRouter = Router({})

type postsType = {
    id: string
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
}

export let posts: postsType [] = []

postsRouter.get('/', (req:Request, res: Response) =>{
    const foundPosts = postsRepository.findPosts();
    res.send(foundPosts);
})

postsRouter.post('/', (req:Request, res:Response) =>{

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

postsRouter.get('/:id', (req: Request, res: Response)=>{
    const post = postsRepository.findPostById(req.params.id)
    if(post){
        res.send(post);
    } else{
        return
    }
})
