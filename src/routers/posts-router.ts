import {Request, Response, Router} from "express";

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
    res.send(posts);
})

postsRouter.post('/', (req:Request, res:Response) =>{
    const error = []

    let title = req.body.title
    let shortDescription = req.body.shortDescription
    let content = req.body.content
    //let blogId = req.body.blogId


    if(!title || typeof title !== "string" || !title.trim() || title.length > 30){
        error.push({
            "message": "Incorrect title",
            "field": "title"
        })
    }
    if(!shortDescription || typeof shortDescription !== "string" || !shortDescription.trim() || shortDescription.length > 100){
        error.push({
            "message": "Incorrect shortDescription",
            "field": "shortDescription"
        })
    }
    if(!content || typeof content !== "string" || !content.trim() || content.length > 1000){
        error.push({
            "message": "Incorrect content",
            "field": "content"
        })
    }
    if(error.length){
        res.status(400).send({errorsMessages: error})
        return;
    }

    const newPost = {
        id: (new Date().getTime().toString()),
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        content: req.body.content,
        blogId: req.body.blogId,
        blogName: req.body.blogName

    }
    posts.push(newPost)
    res.status(201).send(newPost)
})