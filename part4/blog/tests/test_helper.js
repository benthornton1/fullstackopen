const initialBlogs = [
  {
    title: 'Blog 1',
    author: 'Ben',
    url: 'google.com',
    likes: 400,
  },
  {
    title: 'Blog 2',
    author: 'Joe',
    url: 'youtube.com',
    likes: '23',
  },
];

const newBlog = {
  title: 'Test Blog',
  author: 'Ben',
  url: 'google.com',
  likes: 123,
};

const initialUsers = [
  {
    username: 'Jay',
    name: 'Jay',
    password: 'Jay',
  },
  {
    username: 'Jack',
    name: 'Jack',
    password: 'Jack',
  },
];

const invalidPasswordUser = {
  username: 'Ben',
  name: 'Ben',
  password: 'Be',
};

const invalidUsernameUser = {
  username: 'Be',
  name: 'Ben',
  password: 'Ben',
};

const noUsernameUser = {
  name: 'Ben',
  password: 'Ben',
};

const noPasswordUser = {
  username: 'Ben',
  name: 'Ben',
};

module.exports = {
  initialBlogs,
  newBlog,
  initialUsers,
  invalidPasswordUser,
  invalidUsernameUser,
  noUsernameUser,
  noPasswordUser,
};
