const lodash = require("lodash");

// Dummy test function
const dummy = (blogs) => {
  const len = blogs.length;
  len;
  return 1;
};

// Return the total amount of likes in all blogs
const totalLikes = (blogs) => {
  const likesReducer = (sum, item) => {
    return sum + item.likes;
  };
  return blogs.length === 0 ? 0 : blogs.reduce(likesReducer, 0);
};

// Return the title, author and likes of the blog with the most likes
const favoriteBlog = (blogs) => {
  const formatBlog = (blog) => {
    delete blog["url"];
    delete blog["__v"];
    delete blog["_id"];
    return blog;
  };

  const favoriteReducer = (max, blog) => {
    return blog.likes > max.likes ? blog : max;
  };

  const maxLikesBlog = blogs.reduce(favoriteReducer, blogs[0]);

  return blogs.length === 0
    ? {
        title: null,
        author: null,
        likes: 0,
      }
    : formatBlog(maxLikesBlog);
};

// Return the author with the most blogs and how many blogs they've written
const mostBlogs = (blogs) => {
  // Count the amount of times an author appears. countBy returns an object with author names as keys and the amount of blogs they've written
  const authorBlogs = lodash.countBy(blogs, "author");
  // Find author with most blogs. maxBy takes author names and function that returns value to max (amount of blogs)
  const maxBlogsAuthor = lodash.maxBy(lodash.keys(authorBlogs), (author) => authorBlogs[author]);
  // Finally, total blogs of author with most blogs
  const maxBlogsCount = authorBlogs[maxBlogsAuthor];

  return blogs.length === 0
    ? {
        author: null,
        blogs: 0,
      }
    : {
        author: maxBlogsAuthor,
        blogs: maxBlogsCount,
      };
};

// Return the author with most total likes in their blogs and the amount of likes
const mostLikes = (blogs) => {
  // Group blogs by author -> object where key = author name, value = array of blogs written by that author
  const authorLikes = lodash.groupBy(blogs, "author");
  // Map over grouped blogs, calculate total number of likes each author has received -> object where key = author name and value = total number of likes received
  const authorLikesTotal = lodash.mapValues(authorLikes, (blogs) => lodash.sumBy(blogs, "likes"));
  // Find author with most likes. maxBy takes array of keys (author names) and a function that returns the value to compare (likes of that author)
  const maxLikesAuthor = lodash.maxBy(
    lodash.keys(authorLikesTotal),
    (author) => authorLikesTotal[author],
  );
  // Finally, total likes of author with most likes
  const maxLikesCount = authorLikesTotal[maxLikesAuthor];

  return blogs.length === 0
    ? {
        author: null,
        likes: 0,
      }
    : {
        author: maxLikesAuthor,
        likes: maxLikesCount,
      };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
