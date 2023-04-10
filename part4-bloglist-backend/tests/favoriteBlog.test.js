const favoriteBlog = require('../utils/list_helper').favoriteBlog

describe('favorite blog', () => {
    test('of an empty blog list is an empty blog', () => {
        const emptyList = []
        expect(favoriteBlog(emptyList)).toEqual({
            title: null,
            author: null,
            likes: 0
        })
    })

    test('of one blog is that blog', () => {
        const listWithOneBlog = require('./testLists').listWithOneBlog
        expect(favoriteBlog(listWithOneBlog)).toEqual({
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5
        })
    })

    test('of multiple blogs is the one with most likes', () => {
        const blogsList = require('./testLists').blogsList
        expect(favoriteBlog(blogsList)).toEqual({
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            likes: 12
        })
    })
})

module.exports = favoriteBlog