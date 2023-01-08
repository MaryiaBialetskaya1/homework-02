import {blogCollection} from "./db";
import { ObjectId } from "mongodb";
import {getPagesCount, getSkippedNumber, getSort} from "../helpers/paginationFunctions";

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

// function sort(sortDirection: string) {
//     return (sortDirection === 'desc') ? -1 : 1;
// }
// function skipped(pageNumber: number, pageSize: number): number {
//     return ((pageNumber - 1) * (pageSize));
// }

export const blogsQueryRepo = {
    async getAllBlogs(pageNumber: number, pageSize: number, sortBy: string, sortDirection: 'asc' | 'desc', searchNameTerm?: string){
        const filter = searchNameTerm ? {name: {$regex: searchNameTerm}} : {};
        const totalCount = await blogCollection.countDocuments(filter);
        //const pagesCount = Math.ceil(totalCount / pageSize);

        const blogs = await blogCollection
            .find(filter)
            .skip(getSkippedNumber(pageNumber, pageSize))
            .limit(pageSize)
            .sort({[sortBy]: getSort(sortDirection)})
            .toArray();
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
            pagesCount: getPagesCount(totalCount, pageSize),
            page: pageNumber,
            pageSize: pageSize,
            totalCount: totalCount,
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