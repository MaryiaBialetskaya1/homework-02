import { postCollection, postsType} from "./db";
import {blogsRepository} from "./blogs-db-repository";

export let posts: postsType[] = []

export const postsRepository = {
    async findPosts() : Promise<postsType[]> {
        return postCollection.find({}, {projection: {_id:0}}).toArray();
    },

    async findPostById(id: string): Promise<postsType | null> {
        const post = await postCollection.findOne({id: id})
        if (post){
            return {
                id: post.id,
                title: post.title,
                shortDescription: post.shortDescription,
                content: post.content,
                blogId: post.blogId,
                blogName: post.blogName,
                createdAt: post.createdAt
            }
        }
        return null;
    },

    async createPost(title: string, shortDescription: string, content: string, blogId:string): Promise<postsType>{
        const blog = await blogsRepository.findBlogById(blogId)
        const newPost: postsType= {
            id: (new Date().getTime().toString()),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: String(blog?.name),
            createdAt: (new Date(Date.now()).toISOString())
        }
        const newObjectPost: postsType = Object.assign({}, newPost);
        await postCollection.insertOne(newPost)
        return newObjectPost
    },

    async updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string): Promise<boolean>{

        const result = await postCollection.updateOne({id: id}, {$set: {
                title: title,
                shortDescription: shortDescription,
                content: content,
                blogId: blogId
            }})
        return result.matchedCount === 1
    },

    async deletePost(id: string): Promise<boolean> {
        const result = await postCollection.deleteOne({id: id})
        return result.deletedCount === 1
    }
}