const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, b) => {
    return sum + b.likes
  }, 0)
}

const initialBlogs = [
  {
    'title': 'How to cook',
    'author': 'Joe',
    'url': 'http://abc.gov',
    'likes': 3
  },
  {
    'title': 'BBBB',
    'author': 'Joe',
    'url': 'http://123.gov',
    'likes': 2
  }
]

module.exports = {
  dummy, totalLikes, initialBlogs
}