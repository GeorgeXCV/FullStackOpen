const jwt = require('jsonwebtoken')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const config = require('../utils/config')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1
  })
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, config.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'Token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if (!body.title && !body.url) {
    return response.status(400).json({
      error: 'Title and URL are required.'
    })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })


  const newBlog = await blog.save()
  user.blogs = user.blogs.concat(newBlog._id)
  await user.save()
  return response.status(201).json(newBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  const decodedToken = jwt.verify(request.token, config.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'Token missing or invalid' })
  }
  const deleteBlog = await Blog.findById(id)
  if (deleteBlog.user.toString() === decodedToken.id.toString()) {
    await Blog.deleteOne({ _id: id })
    return response.status(204).end()
  } else {
    return response.status(403).json({ error: 'Deleting another user\'s blog is not allowed.' })
  }
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body._doc

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  if (updatedBlog) {
    return response.status(204).json(updatedBlog)
  } else {
    return response.status(404).end()
  }
})

module.exports = blogRouter