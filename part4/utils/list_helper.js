const dummy = (blogs) => {
    const len = (blogs.length)
    len
    return 1
}

const totalLikes = (blogs) => {
    const likesReducer = (sum, item) => {
        return sum + item.likes
    }
    return blogs.length === 0
        ? 0
        : blogs.reduce(likesReducer, 0)
}

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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}