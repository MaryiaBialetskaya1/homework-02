import {blogsRepository} from "../repositories/blogs-db-repository";
import {postsRepository} from "../repositories/posts-db-repository";
import {postsQueryRepo} from "../repositories/posts-queryRepo";
import {blogsQueryRepo} from "../repositories/blogs-queryRepo";

type TypeNewBlog = {
    name: string
    description: string
    websiteUrl: string
    createdAt: string
}



export const blogsService  = {
    async findBlogs(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string, searchNameTerm?: string) : Promise<TypeNewBlog[]>{
        return await blogsRepository.findBlogs(pageNumber, pageSize,  sortBy, sortDirection, searchNameTerm);
    },

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
        return await blogsRepository.updateBlog(id, name, description, websiteUrl);
    },

    async deleteBlog(id: string): Promise<boolean>{
        return await blogsRepository.deleteBlog(id);
    },

    async deleteAll(){
        return await blogsRepository.deleteAll();
    },

    // working now
    async getBlogPosts(id: string){
        return await blogsRepository.getBlogPosts(id)
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

