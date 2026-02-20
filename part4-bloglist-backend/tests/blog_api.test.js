const supertest = require('supertest')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')
const app = require('../app')
const api = supertest(app)

let bearerToken

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save()

    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)

    const login = await api
        .post('/api/login')
        .send({ username: 'root', password: 'sekret' })
    bearerToken = 'Bearer ' + login.body.token
}, 10000)

describe('when some blogs exist initially', () => {
    test('all blogs are returned', async () => {
        const blogs = await helper.blogsInDb()

        expect(blogs).toHaveLength(helper.initialBlogs.length)
    })

    test('a specific blog is within the returned blogs', async () => {
        const blogs = await helper.blogsInDb()

        const titles = blogs.map(b => b.title)
        expect(titles).toContain(
            'HTML is easy'
        )
    })

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('identifier of blogs is called id', async () => {
        const blogs = await helper.blogsInDb()

        blogs.forEach(blog => {
            expect(blog.id).toBeDefined()
            expect(blog._id).toBeUndefined()
        })
    })
})

describe('viewing a specific blog', () => {
    test('succeeds when a valid id is provided', async () => {
        const blogsAtStart = await helper.blogsInDb()

        const blogToView = blogsAtStart[0]

        const resultBlog = await api
            .get(`/api/blogs/${blogToView.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(resultBlog.body).toEqual(blogToView)
    })

    test('fails with 404 if blog does not exist', async () => {
        const nonExistingId = await helper.nonExistingId()

        await api
            .get(`/api/blogs/${nonExistingId}`)
            .expect(404)
    })
})

describe('addition of a new blog', () => {
    test('a valid blog can be added', async () => {
        const newBlog = helper.newBlog

        await api
            .post('/api/blogs')
            .set('Authorization', bearerToken)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

        const titles = blogsAtEnd.map(blog => blog.title)
        expect(titles).toContain(
            'async/await simplifies making async calls'
        )
        const authors = blogsAtEnd.map(blog => blog.author)
        expect(authors).toContain(
            'ECMA 7'
        )
    })

    test('a blog without likes is added with default value of 0', async () => {
        const newBlogWithoutLikes = {
            title: 'Test Blog',
            author: 'Test Author',
            url: 'http://example.com'
        }

        const response = await api
            .post('/api/blogs')
            .set('Authorization', bearerToken)
            .send(newBlogWithoutLikes)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        expect(response.body.likes).toBe(0)

        const blogs = await helper.blogsInDb()
        const addedBlog = blogs.find(blog => blog.id === response.body.id)
        expect(addedBlog.likes).toBe(0)
    })

    test('fails if blog without title or url, results in status 400', async () => {
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
            .set('Authorization', bearerToken)
            .send(newBlogWithoutTitle)
            .expect(400)

        await api
            .post('/api/blogs')
            .set('Authorization', bearerToken)
            .send(newBlogWithoutUrl)
            .expect(400)
    })

    test('fails when invalid token provided', async () => {
        const newBlog = helper.newBlog

        await api
            .post('/api/blogs')
            .set('Authorization', 'this is not a valid token')
            .send(newBlog)
            .expect(401)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

        const titles = blogsAtEnd.map(blog => blog.title)
        expect(titles).not.toContain(
            'async/await simplifies making async calls'
        )
        const authors = blogsAtEnd.map(blog => blog.author)
        expect(authors).not.toContain(
            'ECMA 7'
        )
    })
})

describe('deletion of a blog', () => {
    test('succeeds with status 204 if id is valid', async () => {
        const newBlog = helper.newBlog

        await api
            .post('/api/blogs')
            .set('Authorization', bearerToken)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[blogsAtStart.length - 1]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', bearerToken)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(
            blogsAtStart.length - 1
        )

        const titles = blogsAtEnd.map(r => r.title)
        expect(titles).not.toContain(blogToDelete.title)
    })

    test('fails with status 401 if token is invalid', async () => {
        const newBlog = helper.newBlog

        await api
            .post('/api/blogs')
            .set('Authorization', bearerToken)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[blogsAtStart.length - 1]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', 'this is not a valid token')
            .expect(401)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(
            blogsAtStart.length
        )

        const titles = blogsAtEnd.map(r => r.title)
        expect(titles).toContain(blogToDelete.title)
    })
})

describe('modifying a blog', () => {
    test('modifying likes succeeds when a blog exists', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToModify = blogsAtStart[0]

        const blog = {
            title: blogToModify.title,
            author: blogToModify.author,
            url: blogToModify.url,
            likes: blogToModify.likes + 10,
        }
        await api
            .put(`/api/blogs/${blogToModify.id}`)
            .set('Authorization', bearerToken)
            .send(blog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const modifiedBlog = await api.get(`/api/blogs/${blogToModify.id}`)
        expect(modifiedBlog.body.likes).toBe(blog.likes)
    })

    test('modifying all params succeeds when a blog exists', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToModify = blogsAtStart[1]

        const blog = {
            title: 'This Title Has Been Modified',
            author: 'Modified Author',
            url:'modified-blog.com',
            likes: 101,
        }
        await api
            .put(`/api/blogs/${blogToModify.id}`)
            .set('Authorization', bearerToken)
            .send(blog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const modifiedBlog = await api.get(`/api/blogs/${blogToModify.id}`)
        expect(modifiedBlog.body).toMatchObject(blog)
    })

    test('fails with 400 if title is not a string', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToModify = blogsAtStart[0]

        await api
            .put(`/api/blogs/${blogToModify.id}`)
            .send({ title: 123, author: 'Author', url: 'http://example.com', likes: 1 })
            .expect(400)
    })

    test('fails with 400 if url is not a string', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToModify = blogsAtStart[0]

        await api
            .put(`/api/blogs/${blogToModify.id}`)
            .send({ title: 'Valid Title', author: 'Author', url: { $ne: '' }, likes: 1 })
            .expect(400)
    })

    test('non-numeric likes defaults to 0', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToModify = blogsAtStart[0]

        const response = await api
            .put(`/api/blogs/${blogToModify.id}`)
            .send({ title: 'Valid Title', author: 'Author', url: 'http://example.com', likes: 'not-a-number' })
            .expect(200)

        expect(response.body.likes).toBe(0)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})