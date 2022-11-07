import {Request, Response, Router} from "express";
import {blogsRepository} from "../repositories/blogs-repository";
import {nameValidation, youtubeUrlValidation} from "../middlewares/blogValidationMiddleware";
import {inputValidationMiddleware} from "../middlewares/inputValidationMiddleware";

export const blogsRouter = Router({})

// export type blogsType = {
//     id: string
//     name: string
//     youtubeUrl: string
// }
//
// export let blogs: blogsType[] = []

blogsRouter.get('/', (req:Request, res: Response) =>{
    const foundBlogs = blogsRepository.findBlogs();
    res.send(foundBlogs);

    //res.send(blogs);
})

blogsRouter.post('/',
    nameValidation,
    youtubeUrlValidation,
    inputValidationMiddleware,
    (req:Request ,res: Response) =>{

    const newBlog = blogsRepository.createBlog(req.body.name, req.body.youtubeUrl);
    res.status(201).send(newBlog)

    // const error = []
    //
    // let name = req.body.name
    // let youtubeUrl = req.body.youtubeUrl
    //
    // if(!name || typeof name !== "string" || !name.trim() || name.length > 15){
    //     error.push({
    //         "message": "Incorrect name",
    //         "field": "name"
    //     })
    // }
    // if(youtubeUrl.length > 100){
    //     error.push({
    //         "message": "Incorrect youtubeUrl",
    //         "field": "youtubeUrl"
    //     })
    // }
    //
    // if(error.length){
    //     res.status(400).send({errorsMessages: error})
    //     return;
    // }
    //
    // const newBlog = {
    //     id: (new Date().getTime().toString()),
    //     name: req.body.name,
    //     youtubeUrl: req.body.youtubeUrl
    // }
    // blogs.push(newBlog)
    // res.status(201).send(newBlog)

})

blogsRouter.get('/:blogId', (req:Request, res:Response) =>{
    const blog = blogsRepository.findBlogById(req.params.blogId)
    if(blog){
        res.send(blog);
    } else{
        res.sendStatus(404)
    }



    // const blog = blogs.find(b => b.id === req.params.blogId)
    // if(!blogs){
    //     res.sendStatus(404)
    //     return;
    // }
    // res.send(blog);
})

blogsRouter.put('/:blogId', (req:Request, res:Response) => {

    const isUpdated = blogsRepository.updateBlog(req.params.blogId, req.body.name, req.body.youtubeUrl)
    if(isUpdated){
        const blog = blogsRepository.findBlogById(req.params.blogId)
        res.sendStatus(204)
    } else{
        res.sendStatus(404)
    }



    // const error = []
    //
    // let name = req.body.name
    // let youtubeUrl = req.body.youtubeUrl
    //
    // if(!name || typeof name !== "string" || !name.trim() || name.length > 15){
    //     error.push({
    //         "message": "Incorrect name",
    //         "field": "name"
    //     })
    // }
    // if(youtubeUrl.length > 100){
    //     error.push({
    //         "message": "Incorrect youtubeUrl",
    //         "field": "youtubeUrl"
    //     })
    // }
    //
    // if(error.length){
    //     res.status(400).send({errorsMessages: error})
    //     return;
    // }
    // const id = req.params.blogId
    // let blog = blogs.find(b => b.id === id)
    // if(!blog){
    //     res.sendStatus(404)
    //     return;
    // }
    // blog.name = req.body.name
    // blog.youtubeUrl = req.body.youtubeUrl
    // res.sendStatus(204)

})

blogsRouter.delete('/:blogId', (req: Request, res:Response) => {
    const isDeleted = blogsRepository.deleteBlog(req.params.blogId)
    if(isDeleted){
        res.send(204)
    } else{
        res.send(404)
    }

    // const id = req.params.blogId;
    // const newBlog = blogs.filter(v => v.id !== id)
    // if(newBlog.length < blogs.length) {
    //     blogs = newBlog
    //     res.send(204)
    // } else{
    //     res.send(404)
    // }
})