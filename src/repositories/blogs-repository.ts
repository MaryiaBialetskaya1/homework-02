type blogsType = {
    id: string
    name: string
    websiteUrl: string
}

export let blogs: blogsType[] = []

export const blogsRepository = {
    findBlogs(){
        return blogs;
    },

    createBlog(name: string, websiteUrl: string){
        const newBlog = {
            id: (new Date().getTime().toString()),
            name: name,
            websiteUrl: websiteUrl,
            createdAt: (new Date(Date.now()).toISOString()),
        }
        blogs.push(newBlog)
        return newBlog
    },

    findBlogById(id: string){
        const blog = blogs.find(b => b.id === id)
        return blog;
    },

    updateBlog(id: string, name: string, websiteUrl: string){

        let blog = blogs.find(b => b.id === id)
        if(blog){
            blog.name = name
            blog.websiteUrl = websiteUrl

            return true
        } else{
            return false;
        }
    },

    deleteBlog(id: string){
        for(let i = 0; i < blogs.length; i++){
            if(blogs[i].id === id){
                blogs.splice(i, 1)
                return true;
            }
        }
        return false;
    }

}