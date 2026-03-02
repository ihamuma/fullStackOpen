import React, { useState } from "react";
import Togglable from "./Togglable";
import PropTypes from "prop-types";

const Blog = ({ blog, user, handleLike, handleDelete }) => {
  const [likes, setLikes] = useState(blog.likes);

  const blogStyle = {
    paddingLeft: 10,
    paddingBottom: 5,
    border: "solid",
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 5,
  };

  const likeStyle = {};

  const addLike = (event) => {
    event.preventDefault();
    const newLikes = likes + 1;
    handleLike(blog, newLikes);
    setLikes(newLikes);
  };

  const deleteBlog = (event) => {
    event.preventDefault();
    handleDelete(blog);
  };

  const deleteButton = () => {
    return blog.user.id === user.id ? (
      <button onClick={deleteBlog} id="delete-button">
        Delete
      </button>
    ) : null;
  };

  return (
    <div id="blog-div" style={blogStyle}>
      <h4>{blog.title}</h4>
      <p>Author: {blog.author}</p>
      <Togglable viewButtonLabel="View" hideButtonLabel="Hide">
        <p> Url: {blog.url} </p>
        <p id="likes-p" style={likeStyle}>
          {" "}
          Likes: {likes}{" "}
          <button onClick={addLike} id="like-button">
            Like
          </button>{" "}
        </p>
        <p>
          {" "}
          Posted by: {blog.user.name} {deleteButton()}{" "}
        </p>
      </Togglable>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default Blog;
