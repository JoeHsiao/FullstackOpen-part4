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
    'likes': 3,
    'id': '67acf9dec545ae94b4f28701'
  },
  {
    'title': 'BBBB',
    'author': 'Joe',
    'url': 'http://123.gov',
    'likes': 2,
    'id': '67ad1ade6d34348dfc38048f'
  }
]

module.exports = {
  dummy, totalLikes, initialBlogs
}