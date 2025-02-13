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

test('blogs have id field instead of _id', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.every(blog => 'id' in blog && !('_id' in blog)), true)
})

test('blog is added to database', async () => {
  const newBlog = {
    'title': 'test new blog',
    'author': 'supertest',
    'url': 'xxx.abc.123',
    'likes': 4
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const titles = response.body.map(b => b.title)
  assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
  assert.strictEqual(titles.includes(newBlog.title), true)
})

after(async () => {
  await mongoose.connection.close()
})