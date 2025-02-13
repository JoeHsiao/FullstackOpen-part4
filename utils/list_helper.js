const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, b) => {
    return sum + b.likes
  }, 0)
}

module.exports = {
  dummy, totalLikes
}