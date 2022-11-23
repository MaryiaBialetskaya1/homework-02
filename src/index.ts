import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'
import {blogsRouter} from "./routers/blogs-router";
import {blogs} from "./repositories/blogs-repository";
import {postsRouter} from "./routers/posts-router";

const app = express()
const jsonBodyMiddleware = bodyParser.json()
app.use(jsonBodyMiddleware)

const port = process.env.PORT || 3000

app.use('/blogs', blogsRouter)
app.use('/posts', postsRouter)

app.get('/', (req:Request, res:Response) => {
    res.send('Hello Homework-02 from IT-Incubator!!!!')
})

app.delete( '/testing/all-data', (req: Request, res:Response) =>{
    blogs.splice(0, blogs.length);
    res.send(204)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})