import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, handleAddLike, handleDeleteBlog }) =>  {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addLike = () => {
    handleAddLike(blog)
  }

  const showDeleteButton = (blogUserID) => {
    const loggedInUser = blogService.getCurrrentUser()
    if (loggedInUser.id === blogUserID) {
      return true
    } else {
      return false
    }
  }

  const deleteBlog = () => {
    handleDeleteBlog(blog)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>
        <p>{blog.title} {blog.author} <button onClick={toggleVisibility}>view</button></p>
      </div>
      {visible && (
        <div>
          <p>{blog.url}</p>
          <p>{blog.likes} <button onClick={addLike}>Like</button></p>
          <p>{blog.user.username}</p>
          {showDeleteButton(blog.user.id) && (
            <button onClick={deleteBlog}>Remove</button>
          )
          }
        </div>
      )}
    </div>
  )
}



export default Blog
