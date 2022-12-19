import {blogsRepository} from "../repositories/blogs-db-repository";

type TypeNewBlog = {
    name: string
    description: string
    websiteUrl: string
    createdAt: string
}

export const blogsService  = {
    async findBlogs() : Promise<TypeNewBlog[]>{
        return blogsRepository.findBlogs();
    },

    async findBlogById(id: string): Promise<TypeNewBlog | null>{
        return blogsRepository.findBlogById(id);
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
        return blogsRepository.updateBlog(id, name, description, websiteUrl);
    },

    async deleteBlog(id: string): Promise<boolean>{
        return blogsRepository.deleteBlog(id);
    },

    async deleteAll(){
        return blogsRepository.deleteAll();
    },
}

