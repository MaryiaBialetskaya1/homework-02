import {blogCollection, blogsType, postCollection, postsType} from "./db";
import {ObjectId} from "mongodb";

function sort(sortDirection: string) {
    return (sortDirection === 'desc') ? -1 : 1;
}
export const blogsRepository = {
     async findBlogs(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string, searchNameTerm?:string) : Promise<any>{
         const filter = searchNameTerm ? {name: {$regex: searchNameTerm}} : {};
         const countOfBlogs = await blogCollection.countDocuments(filter);
         const allBloggers = await blogCollection
             .find(filter)
             .skip((pageNumber - 1) * (pageSize))
             .limit(pageSize)
             .sort({[sortBy]: sort(sortDirection)})
             .toArray();

         const map = allBloggers.map((blog)=>{
             return {
                 id: blog._id,
                 name: blog.name,
                 description: blog.description,
                 websiteUrl: blog.websiteUrl,
                 createdAt: blog.createdAt
             }
         });

         return {
             pagesCount: Math.ceil(countOfBlogs / pageSize),
             page: pageNumber,
             pageSize: pageSize,
             totalCount: countOfBlogs,
             items: map
             //items: allBloggers
         }


         //return blogCollection.find({}, ).toArray();
         //: Promise<blogsType[]>
    },
    async findBlogById(id: string): Promise<blogsType | null>{
        const blog  = await blogCollection.findOne({_id: new ObjectId(id)})
        if(!blog){
            return null;
        }
        return blog;
    },
    async findBlogNameById(id: string): Promise<string | null>{
         const blog = await blogCollection.findOne({_id: new ObjectId(id)})
        if(!blog){
            return null
        }
        return blog.name
    },
    async createBlog(newBlog: blogsType ): Promise<string>{
         const result = await blogCollection.insertOne(newBlog);
         return result.insertedId.toString();
    },
    async updateBlog(id: string, name: string, description: string, websiteUrl: string): Promise<boolean>{
        const result = await blogCollection.updateOne(
            {_id: new ObjectId(id)},
            {$set: {name, description, websiteUrl}}
        );
        return result.matchedCount === 1;
    },
    async deleteBlog(id: string): Promise<boolean>{
        const result = await blogCollection.deleteOne({_id: new ObjectId(id)});
        return result.deletedCount === 1;
    },
    async deleteAll(){
        return await blogCollection.deleteMany({});
    },

    // working now
    async getBlogPosts(id: string): Promise<postsType[]> {
        //return await postCollection.find({}).toArray();

       //const result = await blogCollection.find({_id: new ObjectId(id)}).toArray();
       const posts = await postCollection.find({blogId: id}).toArray();
       return posts
    }
}