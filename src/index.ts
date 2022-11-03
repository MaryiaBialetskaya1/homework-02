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
        id: req.params.blogId,
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

app.get('/posts', (req:Request, res: Response) =>{
    res.send(posts);
})

app.delete( '/testing/all-data', (req: Request, res:Response) =>{
    blogs.length = 0;
    res.send(204)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})