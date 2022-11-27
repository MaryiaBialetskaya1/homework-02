
import {blogCollection, blogsType, blogInputType} from "./db";
import {ObjectId} from "mongodb";


export let blogs: blogsType[] = []

export const blogsRepository = {
     async findBlogs() : Promise<blogsType[]>{
         return blogCollection.find({}, {projection:{_id:0}}).toArray();
    },

    async createBlog(name: string, description: string, websiteUrl: string): Promise<string>{
         const newBlog: blogInputType = {
             name: name,
             description: description,
             websiteUrl: websiteUrl,
             createdAt: (new Date(Date.now()).toISOString()),
         }
         const result = await blogCollection.insertOne(newBlog);
         return result.insertedId.toString()

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

    async findBlogById(id: string): Promise<blogsType | null>{
        const blog = await blogCollection.findOne({_id: new ObjectId(id)})
        if(!blog){
            return null
        }
        return blog;
        // if(blog){
        //     return {id: blog._id, name: blog.name, description: blog.description, websiteUrl: blog.websiteUrl, createdAt: blog.createdAt};
        //     } else{
        //         return null
        //     }

    },

    async updateBlog(id: string, name: string, description: string, websiteUrl: string): Promise<boolean>{
        const result = await blogCollection.updateOne({_id: new ObjectId(id)}, {$set: {
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