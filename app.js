const express = require('express')
const blogsRouter = require('./controllers/blogs')
const cors = require('cors')
const config = require('./utils/config')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch(error => {
    logger.error('Error connecting to MongoDB', error.message)
  })

module.exports = app