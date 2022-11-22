export type postsType = {
    id: string
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
    createdAt: any
}

export let posts: postsType[] = []

export const postsRepository = {
    async findPosts() : Promise<postsType[]> {
        return posts;
    },

    async findPostById(id: string): Promise<postsType | null>{
        const post = posts.find(b => b.id === id)
        if(post)
            return post;
        else {
            return null;
        }
    },

    async createPost(title: string, shortDescription: string, content: string, blogId:string): Promise<postsType>{
        const newPost: postsType= {
            id: (new Date().getTime().toString()),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: "Some string",
            createdAt: (new Date(Date.now()).toISOString())
        }
        posts.push(newPost)
        return newPost
    },

    async updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string): Promise<boolean>{

        let post = posts.find(b => b.id === id)
        if(post){
            post.title = title
            post.shortDescription = shortDescription
            post.content = content
            post.blogId = blogId
            return true
        } else{
            return false;
        }
    },

    async deletePost(id: string): Promise<boolean>{
        for(let i = 0; i < posts.length; i++){
            if(posts[i].id === id){
                posts.splice(i, 1)
                return true;
            }
        }
        return false;
    }
}