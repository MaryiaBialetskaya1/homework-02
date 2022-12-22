import {postCollection} from "./db";
import { ObjectId } from "mongodb";

type TypePost = {
    id: string
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
    createdAt: string
};

type TypePostDb = {
    _id: ObjectId
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
    createdAt: string
};

export  const postsQueryRepo = {
    async findPostById(id: string): Promise<TypePost | null>{
        const foundPost = await postCollection.findOne({_id: new ObjectId(id)})
        if(!foundPost?._id){
            return null
        } else{
            return this.blogWithReplaceId(foundPost)
        }
    },

    blogWithReplaceId (object: TypePostDb): TypePost{
        return {
            id: object._id.toString(),
            title: object.title,
            shortDescription: object.shortDescription,
            content: object.content,
            blogId: object.blogId,
            blogName: object.blogName,
            createdAt: object.createdAt
        }
    }
}