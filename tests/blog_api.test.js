const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)
const helper = require('../utils/list_helper')


beforeEach(async () => {
  await Blog.deleteMany()
  let blogObj = new Blog(helper.initialBlogs[0])
  await blogObj.save()
  blogObj = new Blog(helper.initialBlogs[1])
  await blogObj.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blogs have id field', async () => {
  const response = await api.get('/api/blogs')
  assert(response.body.every(blog => 'id' in blog && !('_id' in blog)))
})

after(async () => {
  await mongoose.connection.close()
})