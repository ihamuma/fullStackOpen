const dummy = (blogs) => {
    const len = (blogs.length)
    len
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }
    return blogs.length === 0
        ? 0
        : blogs.reduce(reducer, 0)
}

module.exports = {
    dummy,
    totalLikes
}