const mostBlogs = require('../utils/list_helper').mostBlogs

describe('most blogs', () => {
    test('of an empty blog list is an empty author profile', () => {
        const emptyList = []
        expect(mostBlogs(emptyList)).toEqual({
            author: null,
            blogs: 0
        })
    })

    test('of one blog is the author of that blog', () => {
        const listWithOneBlog = require('./testLists').listWithOneBlog
        expect(mostBlogs(listWithOneBlog)).toEqual({
            author: 'Edsger W. Dijkstra',
            blogs: 1
        })
    })

    test('of multiple blogs is the one with the most blogs', () => {
        const blogsList = require('./testLists').blogsList
        expect(mostBlogs(blogsList)).toEqual({
            author: 'Robert C. Martin',
            blogs: 3
        })
    })
})

module.exports = mostBlogs