import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import blogService from '../services/blogs'

const Blog = ({ blog, handleAddLike, handleDeleteBlog }) =>  {

  const addLike = () => {
    handleAddLike(blog)
  }

  const showDeleteButton = (blogUserID) => {
    try {
      const loggedInUser = blogService.getCurrrentUser()
      if (loggedInUser.id === blogUserID) {
        return true
      } else {
        return false
      }
    } catch (error) {
      console.log(`Failed to determine user delete permissions. Error: ${error}`)
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
        <p className="headline"><Link to={{ pathname: `/blogs/${blog.id}`, state: {blog: blog} }}>{blog.title} {blog.author} </Link></p>
      </div>
      {/* {visible && (
        <div>
          <p className="url">{blog.url}</p>
          <p className="likes">{blog.likes} <button className="addLike" onClick={addLike}>Like</button></p>
          <p className="username">{blog.user.username}</p>
          {showDeleteButton(blog.user.id) && (
            <button className="delete" onClick={deleteBlog}>Remove</button>
          )
          }
        </div>
      )} */}
    </div>
  )
}



export default Blog
