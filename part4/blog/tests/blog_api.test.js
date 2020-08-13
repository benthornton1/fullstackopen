const supertest = require('supertest');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const helper = require('./test_helper');
const Blog = require('../models/blog');
const app = require('../app');
const User = require('../models/user');
const { initialUsers } = require('./test_helper');

const api = supertest(app);
beforeEach(async () => {
  await User.deleteMany({});
  await Blog.deleteMany({});
  const passwordHash = await bcrypt.hash(helper.initialUsers[0].password, 10);
  const user = new User({ username: initialUsers[0].username, passwordHash });
  await user.save();
  const response = await api
    .post('/api/login')
    .send(helper.initialUsers[0])
    .expect(200);
  console.log(response.body.token);
  const response2 = await api
    .post('/api/blogs')
    .set('authorization', response.body.token)
    .send(helper.initialBlogs[0]);
  console.log(response2.body);
});

describe('when requesting all blogs', () => {
  test('check JSON is returned', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('check all blogs are returned', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('check it contains an id property', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body[0].id).toBeDefined();
  });
});

describe('when posting a blog', () => {
  test('check it is saved correctly', async () => {
    const savedBlog = await api
      .post('/api/blogs')
      .send(helper.newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const { id, ...savedBlogNoId } = savedBlog.body;
    expect(savedBlogNoId).toEqual(helper.newBlog);

    const newBlogs = await api.get('/api/blogs');

    expect(newBlogs.body).toHaveLength(3);
  });

  test('and the likes property is missing, check it is assigned', async () => {
    const { likes, ...missingLikesBlog } = helper.newBlog;
    const savedBlog = await api
      .post('/api/blogs')
      .send(missingLikesBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const { id, ...savedBlogNoId } = savedBlog.body;
    expect(savedBlogNoId).toEqual({ ...helper.newBlog, likes: 0 });
  });

  test('and the title and url properties are missing check for correct status code', async () => {
    const { url, title, ...missingPropertiesBlog } = helper.newBlog;
    await api
      .post('/api/blogs')
      .send(missingPropertiesBlog)
      .expect(400);
  });
});

describe('when deleting a blog', () => {
  test('blog is actually deleted', async () => {
    let blogs = await api.get('/api/blogs');
    await api.delete(`/api/blogs/${blogs.body[0].id}`);
    blogs = await api.get('/api/blogs');

    expect(blogs.body).toHaveLength(helper.initialBlogs.length - 1);
  });
});

describe('when updating a blog', () => {
  test('it is actually updated', async () => {
    const blogs = await api.get('/api/blogs');

    console.log(blogs.body[0]);
    const updatedBlog = await api
      .put(`/api/blogs/${blogs.body[0].id}`)
      .send({ ...blogs.body[0], likes: 100 });
    expect(updatedBlog.body).toEqual({ ...blogs.body[0], likes: 100 });
  });
});
afterAll(() => {
  mongoose.connection.close();
});
