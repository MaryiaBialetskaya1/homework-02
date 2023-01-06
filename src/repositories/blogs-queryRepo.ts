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

export type requestQueries = {
    pageNumber: number
    pageSize: number
    sortBy: string
    sortDirection: string
    searchNameTerm: string
};

function sort(sortDirection: string) {
    return (sortDirection === 'desc') ? -1 : 1;
}

function skipped(pageNumber: number, pageSize: number): number {
    return ((pageNumber - 1) * (pageSize));
}

export const blogsQueryRepo = {
    async getAllBlogs(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string, searchNameTerm?: string){
        const filter = searchNameTerm ? {name: {$regex: searchNameTerm}} : {};
        const countBlogs = await blogCollection.countDocuments(filter);

        const blogs = await blogCollection
            .find(filter)
            .skip(skipped(pageNumber, pageSize))
            .limit(pageSize)
            .sort({[sortBy]: sort(sortDirection)})
            .toArray();

        const pagesCount = Math.ceil(countBlogs / pageSize)
        const map = blogs.map((blog) => {
            return {
                id: blog._id,
                name: blog.name,
                description: blog.description,
                websiteUrl: blog.websiteUrl,
                createdAt: blog.createdAt
            }
        });
        return{
            pagesCount: pagesCount,
            page: pageNumber,
            pageSize: pageSize,
            totalCount: countBlogs,
            items: map
        }

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