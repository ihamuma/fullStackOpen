Cypress.Commands.add('resetTestDb', () => {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
})

Cypress.Commands.add('createUser', ({ name, username, password }) => {
    const user = {
        name: name,
        username: username,
        password: password
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
})

Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
        username, password
    }).then(({ body }) => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
        cy.visit('')
    })
})

Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {
    const user = JSON.parse(localStorage.getItem('loggedBlogappUser'))
    const blogLikes = likes || 0
    cy.request({
        url: `${Cypress.env('BACKEND')}/blogs`,
        method: 'POST',
        body: { title: title, author: author, url: url, likes: blogLikes },
        headers: {
            'Authorization': `Bearer ${user.token}`
        }
    })
    cy.visit('')
})