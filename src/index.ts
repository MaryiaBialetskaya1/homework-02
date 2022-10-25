import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'

const app = express()
const jsonBodyMiddleware = bodyParser.json()
app.use(jsonBodyMiddleware)

const port = 3000

app.get('/', (req:Request, res:Response) => {
    res.send('Hello Homework-02 from IT-Incubator!!!!')
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})