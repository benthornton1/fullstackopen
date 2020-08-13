const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  const reducer = (sum, item) => sum + item.likes;
  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  const reducer = (most, blog) => (most.likes > blog.likes ? most : blog);
  return blogs.reduce(reducer, 0);
};

const mostBlogs = (blogs) => {
  const frequencyReducer = (countOfBlogs, blog) => countOfBlogs[blog.author] + 1 || 1;
  const frequency = blogs.reduce(frequencyReducer, 0);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
