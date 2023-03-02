const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'HTML is easy',
        author: 'HTML Expert',
        url: 'major-league-html.com',
        likes: 1
    },
    {
        title: 'HTML is hard',
        author: 'HTML Beginner',
        url: 'minor-league-html.com',
        likes: 100
    },
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, blogsInDb
}