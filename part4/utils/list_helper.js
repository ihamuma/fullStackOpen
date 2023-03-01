const lodash = require('lodash')

// Dummy test function
const dummy = (blogs) => {
    const len = (blogs.length)
    len
    return 1
}

// Return the total amount of likes in all blogs
const totalLikes = (blogs) => {
    const likesReducer = (sum, item) => {
        return sum + item.likes
    }
    return blogs.length === 0
        ? 0
        : blogs.reduce(likesReducer, 0)
}

// Return the title, author and likes of the blog with the most likes
const favoriteBlog = (blogs) => {
    const formatBlog = (blog) => {
        delete blog['url']
        delete blog['__v']
        delete blog['_id']
        return blog
    }

    const favoriteReducer = (max, blog) => {
        return blog.likes > max.likes ? blog : max
    }

    const maxLikesBlog = blogs.reduce(favoriteReducer, blogs[0])

    return blogs.length === 0
        ? {
            title: null,
            author: null,
            likes: 0
        }
        : formatBlog(maxLikesBlog)
}

// Return the author with the most blogs and how many blogs they've written
const mostBlogs = (blogs) => {
    const authorBlogs = lodash.countBy(blogs, 'author')

    const maxBlogsAuthor = lodash.maxBy(lodash.keys(authorBlogs), author => authorBlogs[author])
    const maxBlogsCount = authorBlogs[maxBlogsAuthor]

    return blogs.length === 0
        ? {
            author: null,
            blogs: 0
        }
        : {
            author: maxBlogsAuthor,
            blogs: maxBlogsCount
        }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}