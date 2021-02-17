import React, { useState } from 'react'

const BlogForm = ({ handleBlogChange  }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')

  const onSubmit = (event) => {
    event.preventDefault();
    handleBlogChange(title, author, url)
    setTitle('')
    setAuthor('')
    setURL('')
  }

  return (
    <form onSubmit={onSubmit}> 
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
}

export default BlogForm
