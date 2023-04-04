import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ handleNewBlog }) => {
    const [newBlogTitle, setNewBlogTitle] = useState('')
    const [newBlogAuthor, setNewBlogAuthor] = useState('')
    const [newBlogUrl, setNewBlogUrl] = useState('')

    const addBlog = async (event) => {
        event.preventDefault()
        const success = await handleNewBlog({
            title: newBlogTitle,
            author: newBlogAuthor,
            url: newBlogUrl,
            likes: 0
        })
        if (success) {
            setNewBlogTitle('')
            setNewBlogAuthor('')
            setNewBlogUrl('')
        }
    }

    return (
        <form onSubmit={ addBlog }>
            <h3>Create new blog</h3>
            <div>
        Title:
                <input
                    type='text'
                    value={ newBlogTitle }
                    placeholder='New Blog Title'
                    onChange={({ target }) => setNewBlogTitle(target.value)}
                />
            </div>
            <div>
        Author:
                <input
                    type='text'
                    value={ newBlogAuthor }
                    placeholder='New Blog Author'
                    onChange={({ target }) => setNewBlogAuthor(target.value)}
                />
            </div>
            <div>
        Url:
                <input
                    type='text'
                    value={ newBlogUrl }
                    placeholder='newblog.url'
                    onChange={({ target }) => setNewBlogUrl(target.value)}
                />
            </div>
            <button type='submit'>Create</button>
        </form>
    )
}

BlogForm.propTypes = {
    handleNewBlog: PropTypes.func.isRequired
}

export default BlogForm