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
    searchNameTerm: string,
    pageNumber: string,
    pageSize: string,
    sortBy: string,
    sortDirection:string
};

function sort(sortDir: string) {
    return (sortDir === 'desc') ? -1 : 1;
}

function skipped(pageNum: string, pageSize: string): number {
    return (+pageNum - 1) * (+pageSize);
}



export const blogsQueryRepo = {

    async getAllBlogs(searchNameTerm: string, pageNumber: string, pageSize: string, sortBy: string, sortDir: string){

        // const filter = searchNameTerm ? {name: {$regex: searchNameTerm}} : {};
        // const countOfBloggers = await blogCollection.countDocuments(filter);


        const blogs = await blogCollection.find().skip(skipped(pageNumber, pageSize)).limit(+pageSize)
            .sort(({sortBy: sort(sortDir)})).toArray();

        const allCount = await blogCollection.find({}).toArray();
        const pagesCount = Math.ceil(+allCount.length / +pageSize)

        const allMaps = blogs.map((field) => {
            return {
                id: field._id,
                name: field.name,
                description: field.description,
                websiteUrl: field.websiteUrl,
                createdAt: field.createdAt
            }
        });
        const resultObject = {
            pagesCount: pagesCount,
            page: +pageNumber,
            pageSize: +pageSize,
            totalCount: allCount.length,
            items: allMaps
        }

        return resultObject
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