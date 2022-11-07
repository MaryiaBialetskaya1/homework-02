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
}