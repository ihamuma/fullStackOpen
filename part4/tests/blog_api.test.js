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
    console.log('testing deletion')
    const blogsAtStart = await helper.blogsInDb()
    console.log('blogsAtStart', blogsAtStart)
    const blogToDelete = blogsAtStart[0]
    console.log('deletion started')
    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)
    console.log('deletion ended')
    const blogsAtEnd = await helper.blogsInDb()
    console.log('blogsAtEnd', blogsAtEnd)
    expect(blogsAtEnd).toHaveLength(
        helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
})

afterAll(async () => {
    await mongoose.connection.close()
})