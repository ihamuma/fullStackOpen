const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
        .populate('user', { username: 1, name: 1 })

    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.json(blog)
    } else {
        response.status(404).end()
    }
})

blogsRouter.post('/', userExtractor, async (request, response) => {
    const body = request.body

    if (!body.title) {
        return response.status(400).json({
            error: 'Title missing'
        })
    }
    if (!body.url) {
        return response.status(400).json({
            error: 'URL missing'
        })
    }

    const user = await User.findById(request.user)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user.id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
    const user = request.user
    console.log('Delete - user: ', user)
    const blog = await Blog.findById(request.params.id)
    console.log('Delete - blog.user.toString: ', blog.user.toString())

    if (blog.user.toString() === user) {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } else {
        response.status(401).json({
            error: 'token must belong to user who created blog'
        })
    }
})

blogsRouter.put('/:id', userExtractor, async (request, response) => {
    const body = request.body
    const user = request.user

    const blogToModify = Blog.findById(request.params.id)

    if (blogToModify.user.toString() === user) {
        const blog = {
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes
        }

        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        response.status(201).json(updatedBlog)
    } else {
        response.status(401).json({
            error: 'token must belong to user who created blog'
        })
    }
})

module.exports = blogsRouter