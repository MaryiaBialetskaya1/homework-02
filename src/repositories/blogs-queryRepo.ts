import {blogCollection} from "./db";
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

export type requestQueryAll = {
    pageNumber: number,
    pageSize: number,
    sortBy: string,
    sortDirection:string
    searchNameTerm: string,
};

function sort(sortDirection: string) {
    return (sortDirection === 'desc') ? -1 : 1;
}

function skipped(pageNumber: string, pageSize: string): number {
    return ((+pageNumber - 1) * (+pageSize));
}

export const blogsQueryRepo = {

    async getAllBlogs(searchNameTerm: string, pageNumber: string, pageSize: string, sortBy: string, sortDirection: string){

        const filter = searchNameTerm ? {name: {$regex: searchNameTerm}} : {};
        const countOfBlogs = await blogCollection.countDocuments(filter);
        //const allCount = await blogCollection.find({}).toArray();


        const blogs = await blogCollection
            .find(filter)
            .skip(skipped(pageNumber, pageSize))
            .limit(+pageSize)
            .sort({sortBy: sort(sortDirection)})
            .toArray();


        const pagesCount = Math.ceil(+countOfBlogs / +pageSize)

        const map = blogs.map((field) => {
            return {
                id: field._id,
                name: field.name,
                description: field.description,
                websiteUrl: field.websiteUrl,
                createdAt: field.createdAt
            }
        });
        const result = {
            pagesCount: pagesCount,
            page: +pageNumber,
            pageSize: +pageSize,
            totalCount: countOfBlogs,
            items: map
        }

        return result
    },

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