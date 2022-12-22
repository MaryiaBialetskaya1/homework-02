import { postsRepository } from "../repositories/posts-db-repository";
import { ObjectId } from "mongodb";
import {blogsRepository} from "../repositories/blogs-db-repository";

type TypeNewPost = {
    //_id: ObjectId
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
    createdAt: string
}

export const postService = {
    async findPosts() : Promise<TypeNewPost[]>{
        return postsRepository.findPosts();
    },

    async findPostById(id: string): Promise<TypeNewPost | null>{
        return postsRepository.findPostById(id);
    },

    async createPost(title: string, shortDescription: string, content: string, blogId:string): Promise<string | null>{
        const blog = await blogsRepository.findBlogNameById(blogId);
        if(!blog){
            return null;
        }
        const newPost: TypeNewPost = {
            //_id: new ObjectId(),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: blog,
            createdAt: (new Date(Date.now()).toISOString())
        }
        return await postsRepository.createPost(newPost);
    },

    async updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string): Promise<boolean>{
        return postsRepository.updatePost(id, title, shortDescription, content, blogId);
    },

    async deletePost(id: string): Promise<boolean> {
        return postsRepository.deletePost(id);
    },

    async deleteAll(){
        return postsRepository.deleteAll();
    }
}