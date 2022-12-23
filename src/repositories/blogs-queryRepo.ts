import { blogCollection } from "./db";
import { ObjectId } from "mongodb";

type TypeViewBlog = {
    id: string
    name: string
    description: string
    websiteUrl: string
    createdAt: string
};

type TypeBlogDb = {
    _id: ObjectId
    name: string
    description: string
    websiteUrl: string
    createdAt: string
};

export const blogsQueryRepo = {
    // async findBlogs(): Promise<TypeViewBlog[]>{
    //     const foundBlogs = await blogCollection.find({}).toArray()
    //     return this.blogWithReplaceId(foundBlogs)
    // },

    async findBlogById(id: string): Promise<TypeViewBlog | null>{
        const foundBlog = await blogCollection.findOne({_id: new ObjectId(id)})
            if(!foundBlog?._id){
                return null
            } else{
                return this.blogWithReplaceId(foundBlog)
        }
    },

    blogWithReplaceId (object: TypeBlogDb): TypeViewBlog{
        return {
            id: object._id.toString(),
            name: object.name,
            description: object.description,
            websiteUrl: object.websiteUrl,
            createdAt: object.createdAt
        }
    }
}