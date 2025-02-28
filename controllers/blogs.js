const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  console.log('getToekenFro', request)
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  logger.info('user', user)
  const blog = new Blog({ ...request.body, user: user, likes: request.body.likes | 0 })
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
  const updatedBlog = { ...request.body, user: request.body.user.id }
  try {
    const returnedBlog = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true })
    response.json(returnedBlog)
  } catch (error) {
    logger.error('exception from put', error.message)
    next(error)
  }
})

module.exports = blogsRouter