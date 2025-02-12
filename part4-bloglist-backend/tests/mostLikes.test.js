const mostLikes = require('../utils/list_helper').mostLikes

describe('most likes', () => {
    test('of an empty blog list is an empty author profile', () => {
        const emptyList = []
        expect(mostLikes(emptyList)).toEqual({
            author: null,
            likes: 0
        })
    })

    test('of one blog is the author that blog', () => {
        const listWithOneBlog = require('./testLists').listWithOneBlog
        expect(mostLikes(listWithOneBlog)).toEqual({
            author: 'Edsger W. Dijkstra',
            likes: 5
        })
    })

    test('of multiple blogs is the one with the most likes', () => {
        const blogsList = require('./testLists').blogsList
        expect(mostLikes(blogsList)).toEqual({
            author: 'Edsger W. Dijkstra',
            likes: 17
        })
    })
})

module.exports = mostLikes