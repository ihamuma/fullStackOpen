import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from '../components/BlogForm'

describe('BlogForm component', () => {

    test('calls event handler with correct details when a new blog is created', async () => {
        const handleNewBlog = jest.fn()
        const user = userEvent.setup()

        render(<BlogForm handleNewBlog={handleNewBlog} />)

        const titleInput = screen.getByPlaceholderText('New Blog Title')
        const authorInput = screen.getByPlaceholderText('New Blog Author')
        const urlInput = screen.getByPlaceholderText('newblog.url')
        const createButton = screen.getByText('Create')

        await user.type(titleInput, 'Test Blog Title' )
        await user.type(authorInput, 'Test Blog Author')
        await user.type(urlInput, 'https://testblogurl.com/')
        await user.click(createButton)

        expect(handleNewBlog).toHaveBeenCalledWith({
            title: 'Test Blog Title',
            author: 'Test Blog Author',
            url: 'https://testblogurl.com/',
            likes: 0
        })
    })
})
