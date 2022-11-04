import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'

const app = express()
const jsonBodyMiddleware = bodyParser.json()
app.use(jsonBodyMiddleware)

const port = process.env.PORT || 3000


type blogsType = {
    id: string
    name: string
    youtubeUrl: string
}
type postsType = {
    id: string
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
}

let posts: postsType [] = []
let blogs: blogsType[] = []

app.get('/', (req:Request, res:Response) => {
    res.send('Hello Homework-02 from IT-Incubator!!!!')
})

app.get('/blogs', (req:Request, res: Response) =>{
    res.send(blogs);
})

app.post('/blogs', (req:Request ,res: Response) =>{
    const error = []

    let name = req.body.name
    let youtubeUrl = req.body.youtubeUrl

    if(!name || typeof name !== "string" || !name.trim() || name.length > 15){
        error.push({
            "message": "Incorrect name",
            "field": "name"
        })
    }
    if(youtubeUrl.length > 100){
        error.push({
            "message": "Incorrect youtubeUrl",
            "field": "youtubeUrl"
        })
    }

    if(error.length){
        res.status(400).send({errorsMessages: error})
        return;
    }

    const newBlog = {
        id: (new Date().getTime().toString()),
        name: req.body.name,
        youtubeUrl: req.body.youtubeUrl
    }
    blogs.push(newBlog)
    res.status(201).send(newBlog)

})

app.get('/blogs/:blogId', (req:Request, res:Response) =>{
    const blog = blogs.find(b => b.id === req.params.blogId)
    if(!blogs){
        res.sendStatus(404)
        return;
    }
    res.send(blog);
})

app.put('/blogs/:blogId', (req:Request, res:Response) => {
    const error = []

    let name = req.body.name
    let youtubeUrl = req.body.youtubeUrl

    if(!name || typeof name !== "string" || !name.trim() || name.length > 15){
        error.push({
            "message": "Incorrect name",
            "field": "name"
        })
    }
    if(youtubeUrl.length > 100){
        error.push({
            "message": "Incorrect youtubeUrl",
            "field": "youtubeUrl"
        })
    }

    if(error.length){
        res.status(400).send({errorsMessages: error})
        return;
    }
    const id = req.params.blogId
    let blog = blogs.find(b => b.id === id)
    if(!blog){
        res.sendStatus(404)
        return;
    }
    blog.name = req.body.name
    blog.youtubeUrl = req.body.youtubeUrl
    res.sendStatus(204)

})

app.delete('/blogs/:blogId', (req: Request, res:Response) => {
    const id = req.params.blogId;
    const newBlog = blogs.filter(v => v.id !== id)
    if(newBlog.length < blogs.length) {
        blogs = newBlog
        res.send(204)
    } else{
        res.send(404)
    }
})







app.get('/posts', (req:Request, res: Response) =>{
    res.send(posts);
})

app.post('posts', (req:Request, res:Response) =>{
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

app.delete( '/testing/all-data', (req: Request, res:Response) =>{
    blogs.length = 0;
    res.send(204)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})