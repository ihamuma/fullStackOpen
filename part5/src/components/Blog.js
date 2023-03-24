const Blog = ({blog}) => (
  <div>
    <h4>{blog.title}</h4>
    <p>Author: {blog.author}</p>
    <p>Url: {blog.url}</p>
    <p>Likes: {blog.likes}</p>
  </div>  
)

export default Blog