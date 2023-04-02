import React, { useState } from "react"
import Togglable from "./Togglable"

const Blog = ({ blog, handleLike }) => {
  const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingLeft: 10,
    paddingBottom: 5,
    border: 'solid',
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = (event) => {
    event.preventDefault()
    const newLikes = likes + 1 
    handleLike(blog, newLikes)
    setLikes(newLikes)
  }

  return (
    <div style={ blogStyle }>
      <h4>{ blog.title }</h4>
      <p>Author: { blog.author }</p>
      <Togglable 
        viewButtonLabel='View' 
        hideButtonLabel='Hide'
      >
        <p>Url: { blog.url }</p>
        <p>Likes: { likes } <button onClick={ addLike }>Like</button></p>
        <p>{ blog.user.name }</p>
      </Togglable>
    </div>  
  )
}

export default Blog