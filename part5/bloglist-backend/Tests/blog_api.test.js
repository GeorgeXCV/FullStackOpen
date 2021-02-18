const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const app = require('../app')
const User = require('../models/user')
const Blog = require('../models/blog')
const config = require('../utils/config')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('GET Blogs', () => {
  test('Blogs are returned in JSON format', async () => {
    await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
  })

  test('All Blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('Specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].title).toEqual(helper.initialBlogs[0].title)
  })

  test('Unique identifier property of blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
    expect(response.body[0]._id).toBe(undefined)
  })
})

describe('POST Blogs', () => {
  let token
  beforeAll(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })
    const newUser = await user.save()
    const userForToken = {
      username: newUser.username,
      id: newUser._id,
    }
    token = jwt.sign(userForToken, config.SECRET)
  })

  test('Succeeds with valid data', async () => {
    const newBlog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
    }

    await api.post('/api/blogs').send(newBlog).set('Authorization', `bearer ${token}`).expect(201).expect('Content-Type', /application\/json/)
    const blogsInDb = await helper.blogsInDb()
    expect(blogsInDb).toHaveLength(helper.initialBlogs.length + 1)
    expect(blogsInDb[blogsInDb.length -1].title).toEqual(newBlog.title)
  })

  test('Default likes set to 0 if missing in request body', async () => {
    const newBlogWithoutLikes = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    }

    await api.post('/api/blogs').set('Authorization', `bearer ${token}`).send(newBlogWithoutLikes).expect(201).expect('Content-Type', /application\/json/)
    const blogsInDb = await helper.blogsInDb()
    expect(blogsInDb).toHaveLength(helper.initialBlogs.length + 1)
    expect(blogsInDb[blogsInDb.length -1].title).toEqual(newBlogWithoutLikes.title)
    expect(blogsInDb[blogsInDb.length -1].likes).toEqual(0)
  })

  test('Fails with status code 400 if data invalid', async () => {
    const invalidBlog = {
      author: 'Edsger W. Dijkstra',
    }

    await api.post('/api/blogs').set('Authorization', `bearer ${token}`).send(invalidBlog).expect(400)
    const blogsInDb = await helper.blogsInDb()
    expect(blogsInDb).toHaveLength(helper.initialBlogs.length)
  })

  test('Fails with status code 401 Unauthorized if token not provided', async () => {
    const newBlog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
    }

    await api.post('/api/blogs').send(newBlog).expect(401)
    const blogsInDb = await helper.blogsInDb()
    expect(blogsInDb).toHaveLength(helper.initialBlogs.length)
  })
})

describe('DELETE Blog', () => {
  test('Succeeds with status code 204 if id is valid', async () => {
    let blogsInDb = await helper.blogsInDb()
    const blogToDelete = blogsInDb[0]
    console.log(blogToDelete.id)
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)
    blogsInDb = await helper.blogsInDb()
    expect(blogsInDb).toHaveLength(helper.initialBlogs.length - 1)
  })

  test('Fail with status code 404 if id is invalid', async () => {
    await api.delete('/api/blogs/000000000000').expect(404)
    const blogsInDb = await helper.blogsInDb()
    expect(blogsInDb).toHaveLength(helper.initialBlogs.length)
  })
})

describe('PUT Blog', () => {
  test('Update Title succeeds with status code 204', async () => {
    let blogsInDb = await helper.blogsInDb()
    const blogToUpdate = blogsInDb[0]
    blogToUpdate.title = 'PUT Request works'
    await api.put(`/api/blogs/${blogToUpdate.id}`).send(blogToUpdate).expect(204)
    blogsInDb = await helper.blogsInDb()
    expect(blogsInDb[0].title).toEqual(blogToUpdate.title)
  })

  test('Update Likes succeeds with status code 204', async () => {
    let blogsInDb = await helper.blogsInDb()
    const blogToUpdate = blogsInDb[0]
    blogToUpdate.likes = blogToUpdate.likes + 1
    await api.put(`/api/blogs/${blogToUpdate.id}`).send(blogToUpdate).expect(204)
    blogsInDb = await helper.blogsInDb()
    expect(blogsInDb[0].likes).toEqual(blogToUpdate.likes)
  })

  test('Fail with status code 404 if id is invalid', async () => {
    const blogsInDb = await helper.blogsInDb()
    const blogToUpdate = blogsInDb[0]
    await api.put('/api/blogs/000000000000').send(blogToUpdate).expect(404)
  })
})

describe('Add New User', () => {
  beforeAll(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('Creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'temp',
      name: 'Ryan Howard',
      password: 'newguy',
    }

    await api.post('/api/users').send(newUser).expect(200).expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    expect(usersAtEnd[usersAtEnd.length-1].username).toEqual(newUser.username)
  })

  test('Creation fails with 400 status code and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)
    console.log(result)

    expect(result.body.error).toContain('Error, expected `username` to be unique.')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('Creation fails with 400 status code and message if username not supplied', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'testname',
      password: 'testpassword',
    }

    const result = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` is required.')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('Creation fails with 400 status code and message if username is less than 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'a',
      name: 'anothername234',
      password: 'password',
    }

    const result = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('shorter than the minimum allowed length')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('Creation fails with 400 status code and message if password is less than 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'username894',
      name: 'username',
      password: 'a',
    }

    const result = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)

    expect(result.body.error).toEqual('Password must be at least 3 characters long.')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('Creation fails with 400 status code and message if password is not supplied', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'username123',
      name: 'anotherusername',
    }

    const result = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)

    expect(result.body.error).toEqual('Password is required.')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})