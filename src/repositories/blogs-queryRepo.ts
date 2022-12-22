import { blogCollection } from "./db";
import { ObjectId } from "mongodb";

type TypeBlogView = {
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
    async findBlogById(id: string): Promise<TypeBlogView | null>{
        const foundBlog = await blogCollection.findOne({_id: new ObjectId(id)})
            if(!foundBlog?._id){
                return null
            } else{
                return this.blogWithReplaceId(foundBlog)
        }
    },

    blogWithReplaceId (object: TypeBlogDb): TypeBlogView{
        return {
            id: object._id.toString(),
            name: object.name,
            description: object.description,
            websiteUrl: object.websiteUrl,
            createdAt: object.createdAt
        }
    }
}