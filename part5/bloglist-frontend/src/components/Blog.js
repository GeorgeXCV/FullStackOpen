import React, { useState } from 'react'

const Blog = ({ blog }) =>  {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
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
          <p>{blog.likes} <button>Like</button></p>
       </div>
     )}
   </div>
  )
}
  
 

export default Blog
