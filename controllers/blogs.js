const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  const result = await blog.save()
  response.status(201).json(result)
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

module.exports = blogsRouter