
import {blogCollection, blogsType} from "./db";


export let blogs: blogsType[] = []

export const blogsRepository = {
     async findBlogs() : Promise<blogsType[]>{
         return blogCollection.find({}, {projection:{_id:0}}).toArray();
    },

    async createBlog(name: string, description: string, websiteUrl: string): Promise<blogsType>{
         const newBlog = {
             name: name,
             description: description,
             websiteUrl: websiteUrl,
             createdAt: (new Date(Date.now()).toISOString()),
         }
         const result = await blogCollection.insertOne(newBlog);
         return  {
             id: result.insertedId.toString(),
             name: newBlog.name,
             description: newBlog.description,
             websiteUrl: newBlog.websiteUrl,
             createdAt: newBlog.createdAt
         }

        // const newBlog = {
        //     id: (new Date().getTime().toString()),
        //     name: name,
        //     description: description,
        //     websiteUrl: websiteUrl,
        //     createdAt: (new Date(Date.now()).toISOString()),
        // }
        // const newObjectBlog: blogsType = Object.assign({}, newBlog);
        // await blogCollection.insertOne(newBlog);
        // return newObjectBlog

        // const result = await blogCollection.insertOne(newBlog)
        // return newBlog
    },

    async findBlogById(id: string){
        const blog = await blogCollection.findOne({id: id})
        if(blog){
            return {id: blog.id, name: blog.name, description: blog.description, websiteUrl: blog.websiteUrl, createdAt: blog.createdAt};
            } else{
                return null
            }

    },

    async updateBlog(id: string, name: string, description: string, websiteUrl: string): Promise<boolean>{
        const result = await blogCollection.updateOne({id: id}, {$set: {
                name: name,
                description: description,
                websiteUrl: websiteUrl
            }})
        return result.matchedCount === 1
    },

    async deleteBlog(id: string): Promise<boolean>{
        const result = await blogCollection.deleteOne({id: id})
        return result.deletedCount === 1
    }

}