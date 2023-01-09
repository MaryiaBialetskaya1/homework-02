import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'
import {blogsRouter} from "./routers/blogs-router";
import {postsRouter} from "./routers/posts-router";
import {runDb} from "./repositories/db";
import {posts} from "./repositories/posts-db-repository";
import {blogs} from "./repositories/blogs-db-repository";


const app = express()
const jsonBodyMiddleware = bodyParser.json()
app.use(jsonBodyMiddleware)

const port = process.env.PORT || 3000

app.use('/blogs', blogsRouter)
app.use('/posts', postsRouter)

app.get('/', (req:Request, res:Response) => {
    res.send('Hello Homework-02 from IT-Incubator!!!!')
})

app.delete( '/testing/all-data', async (req: Request, res:Response) =>{
    await blogs.splice(0, blogs.length);
    await posts.splice(0, posts.length);
    res.send(204)
})


const startApp = async () =>{
    await runDb()
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}
startApp()

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })