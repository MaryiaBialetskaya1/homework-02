import { postCollection, postsType} from "./db";
import {blogsRepository} from "./blogs-db-repository";
import {ObjectId} from "mongodb";

export let posts: postsType[] = []

export const postsRepository = {
    async findPosts() : Promise<postsType[]> {
        return postCollection.find({}, {projection: {_id:0}}).toArray();
    },

    async findPostById(id: string): Promise<postsType | null> {
        const post = await postCollection.findOne({_id: new ObjectId(id)})
        if (!post){
            return null;
        }
        return post;
    },

    async createPost(newPost: postsType): Promise<postsType>{

        const newObjectPost: postsType = Object.assign({}, newPost);
        await postCollection.insertOne(newPost)
        return newObjectPost
    },

    async updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string): Promise<boolean>{

        const result = await postCollection.updateOne(
            {_id: new ObjectId(id)},
            {$set: {
                title: title,
                shortDescription: shortDescription,
                content: content,
                blogId: blogId}}
        );
        return result.matchedCount === 1
    },

    async deletePost(id: string): Promise<boolean> {
        const result = await postCollection.deleteOne({_id: new ObjectId(id)})
        return result.deletedCount === 1;
    },

    async deleteAll(){
        await postCollection.deleteMany({})
    }
}