const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "HTML is easy",
    author: "HTML Expert",
    url: "major-league-html.com",
    likes: 1,
  },
  {
    title: "HTML is hard",
    author: "HTML Beginner",
    url: "minor-league-html.com",
    likes: 100,
  },
];

const newBlog = {
  title: "async/await simplifies making async calls",
  author: "ECMA 7",
  url: "asyncftw.net",
  likes: 7,
};

const nonExistingId = async () => {
  const blog = new Blog({
    title: "Highly Temporary Blog",
    author: "Schrödinger",
    url: "short-lived-blogs.com",
    likes: 1,
  });
  await blog.save();
  await blog.delete();

  return blog.id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialBlogs,
  newBlog,
  nonExistingId,
  blogsInDb,
  usersInDb,
};
