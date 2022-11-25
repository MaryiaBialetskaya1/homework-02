import { MongoClient } from "mongodb";

const mongoUri = process.env.mongoURI || 'mongodb://0.0.0.0:27017';
//const mongoUri = process.env.mongoUri || 'mongodb+srv://maryiabialetskaya:Garani11@cluster0.dup2iaz.mongodb.net/?retryWrites=true&w=majority'
console.log('url: ', mongoUri)

export const client = new MongoClient(mongoUri)

export type blogsType = {
    id: string
    name: string
    description: string
    websiteUrl: string
}
export type postsType = {
    id: string
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
    createdAt: any
}

const db = client.db('blogsPosts')
export const blogCollection = db.collection<blogsType>('blogs');
export const postCollection = db.collection<postsType>('posts');

export async function runDb(){
    try{
       await client.connect();
       await client.db("blogs").command({ping: 1});
       await client.db("posts").command({ping: 1});
       console.log("✔ Connected successfully to mongo server");
    } catch {
        console.log("❗ No connection with db");
        await client.close();
    }
}