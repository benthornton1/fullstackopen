const supertest = require('supertest');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const helper = require('./test_helper');
const User = require('../models/user');
const app = require('../app');

const api = supertest(app);
beforeEach(async () => {
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash('secret', 10);
  const user = new User({ username: 'root', passwordHash });

  await user.save();
});

describe('when a user with', () => {
  test('a less than 3 character username is posted, check correct status code and messgae', async () => {
    const user = await api
      .post('/api/users')
      .send(helper.invalidUsernameUser)
      .expect(400);

    expect(user.body).toEqual({
      error: 'User validation failed: username: Path `username` (`Be`) is shorter than the minimum allowed length (3).',
    });
  });
  test('a less than 3 character password is posted', async () => {
    const user = await api
      .post('/api/users')
      .send(helper.invalidPasswordUser)
      .expect(400);

    expect(user.body).toEqual({
      error: 'password missing or less than 3 characters',
    });
  });
  test('no username is posted', async () => {
    const user = await api
      .post('/api/users')
      .send(helper.noUsernameUser)
      .expect(400);

    expect(user.body).toEqual({
      error: 'User validation failed: username: Path `username` is required.',
    });
  });
  test('no password is posted', async () => {
    const user = await api
      .post('/api/users')
      .send(helper.noPasswordUser)
      .expect(400);

    expect(user.body).toEqual({
      error: 'password missing or less than 3 characters',
    });
  });
});
afterAll(() => {
  mongoose.connection.close();
});
