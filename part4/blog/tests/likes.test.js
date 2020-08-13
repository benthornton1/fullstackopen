const listHelper = require('../utils/list_helper');

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
];

const listWithMultipleBlogs = [{
  _id: '5a422a851b54a676234d17f7', title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7, __v: 0,
}, {
  _id: '5a422aa71b54a676234d17f8', title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', likes: 5, __v: 0,
}, {
  _id: '5a422b3a1b54a676234d17f9', title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', likes: 12, __v: 0,
}, {
  _id: '5a422b891b54a676234d17fa', title: 'First class tests', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll', likes: 10, __v: 0,
}, {
  _id: '5a422ba71b54a676234d17fb', title: 'TDD harms architecture', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html', likes: 0, __v: 0,
}, {
  _id: '5a422bc61b54a676234d17fc', title: 'Type wars', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', likes: 2, __v: 0,
},
];
const listWithNoBlogs = [];

describe('total likes', () => {
  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test('when list has multiple blogs, it equals the sum of the likes from all blogs in the list', () => {
    expect(listHelper.totalLikes(listWithMultipleBlogs)).toBe(36);
  });

  test('when list has no blogs, the result is 0', () => {
    expect(listHelper.totalLikes(listWithNoBlogs)).toBe(0);
  });
});

describe('most likes', () => {
  test('when list has only one blog, most likes is the only blog', () => {
    expect(listHelper.favoriteBlog(listWithOneBlog)).toEqual(listWithOneBlog[0]);
  });

  test('when list has multiple blogs, most likes is the blog with the highest number of likes', () => {
    expect(listHelper.favoriteBlog(listWithMultipleBlogs)).toEqual(listWithMultipleBlogs[2]);
  });

  test('when list has no blogs it returns 0', () => {
    expect(listHelper.favoriteBlog(listWithNoBlogs)).toBe(0);
  });
});
