const usersRouter = require('express').Router()
const Users = require('../models/user')
const logger = require('../utils/logger')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
  const result = await Users.find({}).populate('blogs', { title: 1, author: 1, url: 1, id: 1 })
  response.status(200).json(result)
})

usersRouter.post('/', async (request, response) => {
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(request.body.password, saltRounds)
  const newUser = new Users({ ...request.body, password: passwordHash })
  await newUser.save()
  logger.info(newUser)
  response.status(201).json(newUser)
})

module.exports = usersRouter
