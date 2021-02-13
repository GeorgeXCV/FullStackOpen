const listHelper = require('../utils/list_helper')

const noBlogs = []
const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  }
]

test('dummy returns one', () => {
  const result = listHelper.dummy(noBlogs)
  expect(result).toBe(1)
})

describe('Total Likes', () => {
  test('Empty list returns zero', () => {
    const result = listHelper.totalLikes(noBlogs)
    expect(result).toBe(0)
  })

  test('When list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('List with multiple entries is calculated correctly', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(29)
  })
})

describe('Favorite Blog', () => {
  test('Empty list returns zero', () => {
    const result = listHelper.favoriteBlog(noBlogs)
    expect(result).toBe(0)
  })

  test('When list has only one blog, return that blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(listWithOneBlog[0])
  })

  test('List with multiple entries returns a post with the most likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(blogs[0] || blogs[2])
  })
})

describe('Most Blogs', () => {
  test('Empty list returns zero', () => {
    const result = listHelper.mostBlogs(noBlogs)
    expect(result).toBe(0)
  })

  test('When list has only one blog, return that author', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual({
      author: listWithOneBlog[0].author,
      blogs: 1
    })
  })

  test('List with multiple entries returns the author with the most posts', () => {
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 2
    })
  })
})

describe('Most Likes', () => {
  test('Empty list returns zero', () => {
    const result = listHelper.mostLikes(noBlogs)
    expect(result).toBe(0)
  })

  test('When list has only one blog, return that author and likes', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toEqual({
      author: listWithOneBlog[0].author,
      likes: listWithOneBlog[0].likes
    })
  })

  test('List with multiple entries returns the author with the most likes', () => {
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })
})