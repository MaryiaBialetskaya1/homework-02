type postsType = {
    id: string
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
}

export let posts: postsType[] = []

export const postsRepository = {
    findPosts() {
        return posts;
    },

    createPost(title: string, shortDescription: string, content: string, blogId:string){
        const newPost = {
            id: (new Date().getTime().toString()),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: "Some string"
        }
        posts.push(newPost)
        return newPost
    },

    findPostById(id: string){
        const post = posts.find(b => b.id === id)
        return post;
    },

    updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string){

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

    deletePost(id: string){
        for(let i = 0; i < posts.length; i++){
            if(posts[i].id === id){
                posts.splice(i, 1)
                return true;
            }
        }
        return false;
    }
}