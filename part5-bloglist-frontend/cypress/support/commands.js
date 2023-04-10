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

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
    const user = JSON.parse(localStorage.getItem('loggedBlogappUser'))
    cy.request({
        url: `${Cypress.env('BACKEND')}/blogs`,
        method: 'POST',
        body: { title, author, url },
        headers: {
            'Authorization': `Bearer ${user.token}`
        }
    })
    cy.visit('')
})