import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'

const app = express()
const jsonBodyMiddleware = bodyParser.json()
app.use(jsonBodyMiddleware)

const port = 3000

let videos = [
    {id:1, title: '1'},
    {id:2, title: '2'},
    {id:3, title: '3'},
]
app.get('/', (req:Request, res:Response) => {
    res.send('Hello Homework-02 from IT-Incubator!!!!')
})
app.get('/videos', (req:Request, res:Response) => {
    res.send(videos)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})