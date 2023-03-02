const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const app = require('../app')
const api = supertest(app)


// Reset test database to same state before running each test
beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        // Desired value defined as regex instead of string to enable title type to have other info, such as encoding, without test failing
        .expect('Content-Type', /application\/json/)
// Set timeout to 100000ms so test doesn't fail due to time. Fine here as test not based on performance or speed.
}, 100000)

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('identifier of blogs is called id', async () => {
    const blogs = await helper.blogsInDb()

    blogs.forEach(blog => {
        expect(blog.id).toBeDefined()
        expect(blog._id).toBeUndefined()
    })
})

test('a blog without likes is added with default value of 0', async () => {
    const newBlog = {
        title: 'Test Blog',
        author: 'Test Author',
        url: 'http://example.com'
    }

    const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)

    const blogs = await helper.blogsInDb()
    const addedBlog = blogs.find(blog => blog.id === response.body.id)
    expect(addedBlog.likes).toBe(0)
})

test('creating a blog without title or url results in status 400', async () => {
    const newBlogWithoutTitle = {
        author: 'John Doe',
        url: 'https://example.com/blog-post-without-title',
        likes: 5
    }

    const newBlogWithoutUrl = {
        title: 'Blog Post Without URL',
        author: 'Jane Doe',
        likes: 10
    }

    await api
        .post('/api/blogs')
        .send(newBlogWithoutTitle)
        .expect(400)

    await api
        .post('/api/blogs')
        .send(newBlogWithoutUrl)
        .expect(400)
})


test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(b => b.title)
    expect(titles).toContain(
        'HTML is easy'
    )
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'async/await simplifies making async calls',
        author: 'ECMA 7',
        url: 'asyncftw.net',
        likes: 7
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).toContain(
        'async/await simplifies making async calls'
    )
})

test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(resultBlog.body).toEqual(blogToView)
})

test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(
        helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).not.toContain(blogToDelete.title)
})

afterAll(async () => {
    await mongoose.connection.close()
})