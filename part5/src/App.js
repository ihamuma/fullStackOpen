import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    async function fetchBlogs() {
      const blogs = await blogService.getAll()
      console.log(blogs)
      setBlogs(blogs)
    }
    fetchBlogs()
  }, [])

  useEffect( () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage({ text: 'Wrong username or password', class: 'error' })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    try {
      window.localStorage.clear()
      blogService.setToken(null)
      setUser(null)
      setMessage({ text: 'Logout successful', class: 'message'})
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setMessage({ text: 'Logout failed', class: 'error'})
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={ handleLogin }>
      <h2>Log in to application</h2>
      <div>
        Username
        <input
          type='text'
          value={ username }
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password
        <input
          type='password'
          value={ password }
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>Log in</button>
    </form>
  )

  const handleNewBlog = async ( newBlog ) => {
    try {
      const response = await blogService.create(newBlog)
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(response))
      setMessage({ text: `A new blog ${ newBlog.title } by ${ newBlog.author } added`, class: 'message' })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setMessage({ text: 'Blog creation failed', class: 'error'})
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const blogFormRef = useRef()

  const blogForm = () => {
    return (
      <Togglable viewButtonLabel='Create new' hideButtonLabel='Cancel' ref={ blogFormRef }>
        <BlogForm
          handleNewBlog={ handleNewBlog }
        />
      </Togglable>
    )
  }

  const blogList = () => (
    <div>
      <p>{ user.name } logged in</p>
      <button
        onClick={ handleLogout }
      >
        Log out
      </button>
      { blogForm() }
      <h3>Blogs</h3>
      {blogs.map(blog =>
        <Blog key={ blog.id } blog={ blog } />
      )}
    </div>
  )

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={ message } />

      { user 
        ? blogList()
        : loginForm() }

    </div>
  )
}

export default App