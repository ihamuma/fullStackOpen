import React from "react"
import Togglable from "./Togglable"
import '../index.css'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingLeft: 10,
    paddingBottom: 5,
    border: 'solid',
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <h4>{ blog.title }</h4>
      <p>Author: { blog.author }</p>
      <Togglable viewButtonLabel='View' hideButtonLabel='Hide'>
        <p>Url: { blog.url }</p>
        <p>Likes: { blog.likes } <button>Like</button></p>
        <p>{ blog.user.username }</p>
      </Togglable>
    </div>  
  )
}

export default Blog