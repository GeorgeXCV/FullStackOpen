import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route, useLocation, Link } from "react-router-dom";
import { initializeBlogs, addBlog, addLike, deleteBlog } from './reducers/blogReducer'
import { newNotification } from './reducers/notificationReducer'
import { setUser } from './reducers/userReducer'
import Blog from './components/Blog'
import BlogDetails from './components/BlogDetails'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import User from './components/User'
import Users from './components/Users'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {
  const blogFormRef = useRef()
  const dispatch  = useDispatch()
  const location = useLocation();
  const blogs = useSelector(state => state.blog)
  const message = useSelector(state => state.notification)
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('blogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('blogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      dispatch(newNotification({ text: 'Successfully logged in!', type: 'notification' }, 5))
    } catch (exception) {
      dispatch(newNotification({ text: 'Wrong Credentials', type: 'error' }, 5))
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    if (window.confirm('Are you sure you want to logout?')) {
      window.localStorage.removeItem('blogUser')
      dispatch(setUser(null))
      dispatch(newNotification({ text: 'Successfully logged out!', type: 'notification' }, 5))
    }
  }

  const handleBlogChange = async (title, author, url) => {
    try {
      blogFormRef.current.toggleVisibility()
      dispatch(addBlog(title, author, url))
      dispatch(newNotification({ text: `A new blog: ${title} by ${author} added`, type: 'notification' }, 5))
    } catch (error) {
      dispatch(newNotification({ text: `Failed to add blog. Error: ${error}`, type: 'error' }, 5))
    }
  }

  const handleAddLike = async (blog) => {
    try {
      dispatch(addLike(blog))
      dispatch(newNotification({ text: `You liked ${blog.title}`, type: 'notification' }, 5))
    } catch (error) {
      dispatch(newNotification({ text: `Failed to add like. Error: ${error}`, type: 'error' }, 5))
    }
  }

  const handleDeleteBlog = async (blog) => {
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
        dispatch(deleteBlog(blog.id))
        dispatch(newNotification({ text: `You deleted ${blog.title}`, type: 'notification' }, 5))
      }
    } catch (error) {
      dispatch(newNotification({ text: `Failed to delete blog. Error: ${error}`, type: 'error' }, 5))
    }
  }

  const menu =  {
    backgroundColor: '#B0B0B0',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 2,
    borderWidth: 1,
    marginBottom: 5
  }

  const padding = {
    paddingRight: 5
  }

  if (user === null) {
    return (
      <div>
        <h1>Blogs</h1>
        <Notification message={message} />
        <h2>Login to application</h2>
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
              <p style={menu}>
              <Link to='/' style={padding}>Blogs</Link>
              <Link to='/users' style={padding}>Users</Link>
                {user.name} logged-in <button type="submit" onClick={handleLogout}>logout</button> </p>
              <Switch>
                <Route path="/blogs/:id">
                  {location.state &&
                     <BlogDetails blog={location.state.blog}/>
                  }
                </Route>
                <Route path="/users/:id">
                  {location.state &&
                     <User user={location.state.user}/>
                  }
                </Route>
                <Route path="/users">
                  <Users />
                </Route>
                <Route path="/">
                {<Togglable buttonLabel="New Blog" ref={blogFormRef} >
                <BlogForm handleBlogChange={handleBlogChange}/>
                </Togglable>
                }
                {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
                <Blog key={blog.id} blog={blog} handleAddLike={handleAddLike} handleDeleteBlog={handleDeleteBlog}/>
                )}
                </Route>
              </Switch>
            </div>
        }
      </div>
    )
  }
}

export default App