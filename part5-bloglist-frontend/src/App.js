import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchBlogs() {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    }
    fetchBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setMessage({ text: "Wrong username or password", class: "error" });
    }
  };

  const handleLogout = () => {
    try {
      window.localStorage.clear();
      blogService.setToken(null);
      setUser(null);
      setMessage({ text: "Logout successful", class: "message" });
    } catch (exception) {
      setMessage({ text: "Logout failed", class: "error" });
    }
  };

  const loginForm = () => (
    <form id="loginForm" onSubmit={handleLogin}>
      <h2>Log in to application</h2>
      <div>
        Username
        <input
          type="text"
          id="username"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password
        <input
          type="password"
          id="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" id="login-button">
        Log in
      </button>
    </form>
  );

  const handleLike = async (blog, newLikes) => {
    const updatedBlog = { ...blog, likes: newLikes };
    try {
      await blogService.update(blog.id, updatedBlog);
    } catch (exception) {
      setMessage({ text: `Liking ${blog.title} failed`, class: "error" });
    }
  };

  const handleDelete = async (blog) => {
    try {
      if (window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
        await blogService.remove(blog.id);
        setMessage({
          text: `${blog.title} by ${blog.author} deleted successfully`,
          class: "message",
        });

        const updatedBlogs = blogs.filter((b) => b.id !== blog.id);
        setBlogs(updatedBlogs);
      }
    } catch (exception) {
      setMessage({ text: `Error deleting ${blog.title}`, class: "error" });
    }
  };

  const handleNewBlog = async (newBlog) => {
    try {
      const response = await blogService.create(newBlog);
      response.user = user;
      blogFormRef.current.toggleVisibility();

      setBlogs(blogs.concat(response));
      setMessage({
        text: `A new blog ${newBlog.title} by ${newBlog.author} added`,
        class: "message",
      });

      return true;
    } catch (exception) {
      setMessage({ text: "Blog creation failed", class: "error" });

      return false;
    }
  };

  const blogFormRef = useRef();

  const blogForm = () => {
    return (
      <Togglable viewButtonLabel="Create new" hideButtonLabel="Cancel" ref={blogFormRef}>
        <BlogForm handleNewBlog={handleNewBlog} />
      </Togglable>
    );
  };

  const blogList = () => (
    <div id="blogList">
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>Log out</button>
      {blogForm()}
      <h3>Blogs</h3>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            handleLike={handleLike}
            handleDelete={handleDelete}
          />
        ))}
    </div>
  );

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={message} />

      {user ? blogList() : loginForm()}
    </div>
  );
};

export default App;
