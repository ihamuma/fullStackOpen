describe('Bloglist app', () => {

    beforeEach(function() {
        cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
        const user = {
            name: 'Testy Tester',
            username: 'tester',
            password: 'sekret'
        }
        cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
        cy.visit('')
    })

    it('front page can be opened', function () {
        cy.contains('Blogs')
    })

    it.only('login form is shown', function() {
        cy.contains('Log in to application')
        cy.get('#loginForm')
            .should('contain', 'Log in to application')
            .and('contain', 'Username')
            .and('contain', 'Password')
            .and('contain', 'Log in')
    })

    it('user can log in', function() {
        cy.get('#username').type('tester')
        cy.get('#password').type('sekret')
        cy.get('#login-button').click()

        cy.contains('Testy Tester logged in')
    })

    it('login fails with wrong password', function() {
        cy.get('#username').type('tester')
        cy.get('#password').type('wrong')
        cy.get('#login-button').click()

        cy.get('.error')
            .should('contain', 'Wrong username or password')
            .and('have.css', 'color', 'rgb(255, 0, 0)')
            .and('have.css', 'border-style', 'solid')

        cy.get('html').should('not.contain', 'Testy Tester logged in')
    })

    describe('when logged in', function() {

        beforeEach(function() {
            cy.login({ username: 'tester', password: 'sekret' })
        })

        it('a new blog can be created', function() {
            cy.contains('Create new').click()
            cy.get('#newBlogTitle').type('Cypress created this')
            cy.get('#newBlogAuthor').type('Cypress')
            cy.get('#newBlogUrl').type('cypress-blog.com')
            cy.get('#createBlog-button').click()

            cy.contains('Cypress created this')
            cy.contains('Cypress')
            cy.contains('cypress-blog.com')
        })

        describe('and a blog exists', function() {
            beforeEach(function() {
                cy.createBlog({
                    title: 'Cypress created this too',
                    author: 'Cypress as well',
                    url: 'cypress-blog-2.com'
                })
            })

            it('it can be viewed', function() {
                cy.contains('View').click()
                cy.contains('cypress-blog-2.com')
            })

            it('it can be liked', function() {
                cy.contains('View').click()
                cy.contains('Like').click()
            })
        })
    })

})