const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const users = await User.find({})
  const user = users[0]

  logger.info('user', user)
  const blog = new Blog({ ...request.body, user: user.id })
  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const res = await Blog.findByIdAndDelete(request.params.id)
    logger.info('deleted blog', res)
  } catch (error) {
    logger.error(error)
    next(error)
  }
  response.status(204).send()
})

blogsRouter.put('/:id', async (request, response, next) => {
  const updatedBlog = request.body
  try {
    const returnedBlog = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true })
    response.json(returnedBlog)
  } catch (error) {
    logger.error('exception from put', error.message)
    next(error)
  }
})

module.exports = blogsRouter