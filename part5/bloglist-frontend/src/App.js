import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    async function getBlogs() {
      try {
        const blogs = await blogService.getAll()
        setBlogs(blogs)
      } catch (error) {
        console.log(`Failed to fetch blogs. Error: ${error}`)
      }
    }

    getBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('blogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {setMessage(null)}, 5000)
  },[message !== null])

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('blogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setMessage({ text: 'Successfully logged in!', type: 'notification' })
    } catch (exception) {
      setMessage({ text: 'Wrong Credentials', type: 'error' })
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    if (window.confirm('Are you sure you want to logout?')) {
      window.localStorage.removeItem('blogUser')
      setUser(null)
      setMessage({ text: 'Successfully logged out!', type: 'notification' })
    }
  }

  const handleBlogChange = async (title, author, url) => {
    try {
      blogFormRef.current.toggleVisibility()
      const newSubmission = await blogService.create({
        title: title,
        author: author,
        url: url
      })
      setBlogs(blogs.concat(newSubmission))
      setMessage({ text: `A new blog: ${title} by ${author} added`, type: 'notification' })
    } catch (error) {
      setMessage({ text: `Failed to add blog. Error: ${error}`, type: 'error' })
    }
  }

  const handleAddLike = async (blog) => {
    try {
      blog.likes = blog.likes + 1
      const updatedBlog = await blogService.update(blog.id, {
        user: blog.user.id,
        likes: blog.likes,
        author: blog.author,
        title: blog.title,
        url: blog.url
      })
      setBlogs(blogs.concat(updatedBlog))
      setMessage({ text: `You liked ${blog.title}`, type: 'notification' })
    } catch (error) {
      setMessage({ text: `Failed to add like. Error: ${error}`, type: 'error' })
    }
  }

  const handleDeleteBlog = async (blog) => {
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
        await blogService.deleteBlog(blog.id)
        const updatedBlogsList = blogs.filter(blogIndex => blogIndex.id !== blog.id)
        setBlogs(updatedBlogsList)
        setMessage({ text: `You deleted ${blog.title}`, type: 'notification' })
      }
    } catch (error) {
      setMessage({ text: `Failed to delete blog. Error: ${error}`, type: 'error' })
    }
  }

  if (user === null) {
    return (
      <div>
        <h1>Blogs</h1>
        <Notification message={message} />
        <h2>Log in to application</h2>
        <LoginForm handleLogin={handleLogin} />
      </div>
    )
  } else {
    return (
      <div>
        <h1>Blogs</h1>
        <Notification message={message} />
        {
          user === null ?
            <LoginForm handleLogin={handleLogin} /> :
            <div>
              <p>{user.name} logged-in <button type="submit" onClick={handleLogout}>logout</button> </p>
              {<Togglable buttonLabel="New Blog" ref={blogFormRef} >
                <BlogForm handleBlogChange={handleBlogChange}/>
              </Togglable>
              }
            </div>
        }
        {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <Blog key={blog.id} blog={blog} handleAddLike={handleAddLike} handleDeleteBlog={handleDeleteBlog}/>
        )}
      </div>
    )
  }
}

export default App