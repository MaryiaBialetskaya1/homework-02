import {blogs} from "./blogs-repository";

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
    createPost(title: string, shortDescription: string, content: string, blogId:string, blogName: string){
        const newPost = {
            id: (new Date().getTime().toString()),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: blogName
        }
        posts.push(newPost)
        return newPost
    },
    findPostById(id: string){
        const post = blogs.find(b => b.id === id)
        return post;
    }
}