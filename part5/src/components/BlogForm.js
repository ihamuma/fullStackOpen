import { useState } from 'react'

const BlogForm = ({ handleNewBlog }) => {
    const [newBlogTitle, setNewBlogTitle] = useState('')
    const [newBlogAuthor, setNewBlogAuthor] = useState('')
    const [newBlogUrl, setNewBlogUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        handleNewBlog({
            title: newBlogTitle,
            author: newBlogAuthor,
            url: newBlogUrl,
            likes: 0
        })

        setNewBlogTitle('')
        setNewBlogAuthor('')
        setNewBlogUrl('')
    }

    return (
      <form onSubmit={ addBlog }>
      <h3>Create new blog</h3>
      <div>
        Title: 
        <input 
          type='text'
          value={ newBlogTitle }
          onChange={({ target }) => setNewBlogTitle(target.value)}
          />
      </div>
      <div>
        Author: 
        <input 
          type='text'
          value={ newBlogAuthor}
          onChange={({ target }) => setNewBlogAuthor(target.value)}
          />
      </div>
      <div>
        Url: 
        <input 
          type='text'
          value={ newBlogUrl}
          onChange={({ target }) => setNewBlogUrl(target.value)}
          />
      </div>
      <button type='submit'>Create</button>
    </form>
    )
  }

  export default BlogForm