const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  } else if (blogs.length === 1) {
    return blogs[0].likes
  } else {
    return blogs.reduce((current, { likes }) => current + likes, 0)
  }
}

const favoriteBlog  = (blogs) => {
  if (blogs.length === 0) {
    return 0
  } else if (blogs.length === 1) {
    return blogs[0]
  } else {
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
    return sortedBlogs[0]
  }
}

const mostBlogs  = (blogs) => {
  let result = {
    author: '',
    blogs: 1
  }
  if (blogs.length === 0) {
    return 0
  } else if (blogs.length === 1) {
    result.author = blogs[0].author
    return result
  } else {
    let map = {}
    blogs.forEach( blog => {
      if (map[blog.author]) {
        map[blog.author]++
      } else {
        map[blog.author] = 1
      }
    })
    const sortedAuthors = Object.keys(map).sort((a, b) => map[b] - map[a])
    result.author = sortedAuthors[0]
    result.blogs = map[sortedAuthors[0]]
    return result
  }
}

const mostLikes  = (blogs) => {
  let result = {
    author: '',
    likes: 0
  }
  if (blogs.length === 0) {
    return 0
  } else if (blogs.length === 1) {
    result.author = blogs[0].author
    result.likes = blogs[0].likes
    return result
  } else {
    let map = {}
    blogs.forEach( blog => {
      if (map[blog.author]) {
        map[blog.author] += blog.likes
      } else {
        map[blog.author] = blog.likes
      }
    })
    const sortedAuthors = Object.keys(map).sort((a, b) => map[b] - map[a])
    result.author = sortedAuthors[0]
    result.likes = map[sortedAuthors[0]]
    return result
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}