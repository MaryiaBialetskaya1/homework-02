import {MongoClient, ObjectId} from "mongodb";
import 'dotenv/config'

const mongoUri = process.env.mongoURL || 'mongodb://0.0.0.0:27017';
console.log('url: ', mongoUri)
if(!mongoUri){
    console.log('❗Url do not found.')
}


export const client = new MongoClient(mongoUri)

export type blogsType = {
    _id: ObjectId
    name: string
    description: string
    websiteUrl: string
    createdAt: string
}

export type postsType = {
    _id: ObjectId
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
    createdAt: string
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