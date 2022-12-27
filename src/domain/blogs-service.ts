import {blogsRepository} from "../repositories/blogs-db-repository";
import {ObjectId} from "mongodb";
import {blogsQueryRepo} from "../repositories/blogs-queryRepo";
import {postsRepository} from "../repositories/posts-db-repository";

type TypeNewBlog = {
    //_id: ObjectId
    name: string
    description: string
    websiteUrl: string
    createdAt: string
}

export const blogsService  = {
    async findBlogs() : Promise<TypeNewBlog[]>{
        return blogsRepository.findBlogs();
    },

    // async findBlogById(id: string): Promise<TypeNewBlog | null>{
    //     return blogsRepository.findBlogById(id);
    // },

    async createBlog(name: string, description: string, websiteUrl: string): Promise<string>{
        const newBlog = {
            name: name,
            description: description,
            websiteUrl: websiteUrl,
            createdAt: (new Date(Date.now()).toISOString()),
        }
        return await blogsRepository.createBlog(newBlog);
    },

    async updateBlog(id: string, name: string, description: string, websiteUrl: string): Promise<boolean>{
        return blogsRepository.updateBlog(id, name, description, websiteUrl);
    },

    async deleteBlog(id: string): Promise<boolean>{
        return blogsRepository.deleteBlog(id);
    },

    async deleteAll(){
        return blogsRepository.deleteAll();
    },

    // working now
    async getBloggersPost(id: string){
        return blogsRepository.getBloggersPost(id);
    },

    async createBloggerPost(title: string, shortDescription: string, content: string, blogId: string){
        const blog = await blogsRepository.findBlogNameById(blogId);
        if(!blog){
            return null;
        }
        const newPost = {
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName : blog,
            createdAt: (new Date(Date.now()).toISOString())
        }
         return await postsRepository.createPost(newPost)
    }
}

