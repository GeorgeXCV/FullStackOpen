import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from "./components/Notification";
import blogService from './services/blogs'
import loginService from './services/login' 
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')   
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')

  useEffect(() => {
    async function getBlogs() {
      try {
        const blogs = await blogService.getAll();
        setBlogs(blogs);
      } catch (error) {
        console.log(`Failed to fetch blogs. Error: ${error}`)
      }
    }

    getBlogs();
  }, [blogs])

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

  const handleLogin = async (event) => {    
    event.preventDefault()    

    try {      
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('blogUser', JSON.stringify(user))       
      blogService.setToken(user.token)
      setUser(user)
      setMessage({text: `Successfully logged in!`, type: 'notification'})       
      setUsername('')      
      setPassword('')    
    } catch (exception) {      
      setMessage({text: `Wrong Credentials`, type: 'error'}) 
    }
  }

  const handleLogout = (event) => {    
    event.preventDefault()    
    if (window.confirm(`Are you sure you want to logout?`)) {
        window.localStorage.removeItem('blogUser')
        setUser(null)
        setMessage({text: `Successfully logged out!`, type: 'notification'})       
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const handleBlogChange = async (event) => {  
    try {
      event.preventDefault()    
      const newSubmission = await blogService.create({
        title: title,
        author: author,
        url: url
      })
      setBlogs(blogs.concat(newSubmission))
      setMessage({text: `A new blog: ${title} by ${author} added`, type: 'notification'}) 
      setTitle('')
      setAuthor('')
      setURL('')
    } catch (error) {
      setMessage({text: `Failed to add blog. Error: ${error}`, type: 'error'}) 
    }  
    
  }

  const blogForm = () => (
    <form onSubmit={handleBlogChange}> 
      <div>
      <h2>Create New</h2>
      <div>
      Title: <input type="text" value={title} name="Title" onChange={({ target }) => setTitle(target.value)}/>
      </div>
      <div>
      Author: <input type="text" value={author} name="Author" onChange={({ target }) => setAuthor(target.value)}/>
      </div>
      <div>
      URL: <input type="text" value={url} name="URL" onChange={({ target }) => setURL(target.value)}/>
      </div>
      <button type="submit">Create</button>
      </div>
     
    </form>  
  )

  if (user === null) {
    return (
      <div>
        <h1>Blogs</h1>
        <Notification message={message} />
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>        
          <div>
            Username: <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />        
          </div>        
          <div>         
            Password: <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} /> 
          </div>        
            <button type="submit">Login</button> 
        </form>
      </div>
    )
  } else {
    return (
      <div>
        <h1>Blogs</h1>
        <Notification message={message} />
  
        {user === null ?
          loginForm() :
          <div>
            <p>{user.name} logged-in <button type="submit" onClick={handleLogout}>logout</button> </p> 
           {blogForm()} 
          </div>
        }    
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }
}

export default App