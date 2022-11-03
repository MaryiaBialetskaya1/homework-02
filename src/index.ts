import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'

const app = express()
const jsonBodyMiddleware = bodyParser.json()
app.use(jsonBodyMiddleware)

const port = process.env.PORT || 3000

let posts: any = []
let blogs: any = []

app.get('/', (req:Request, res:Response) => {
    res.send('Hello Homework-02 from IT-Incubator!!!!')
})
app.delete( '/testing/all-data', (req: Request, res:Response) =>{
    blogs.length = 0;
    posts.length = 0;
    res.send(204)
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

    if(error.length){
        res.status(400).send({errorsMessages: error})
        return;
    }

    const newBlog = {
        name: req.body.name,
        youtubeUrl: req.body.youtubeUrl
    }
    blogs.push(newBlog)
    res.status(201).send(newBlog)

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})