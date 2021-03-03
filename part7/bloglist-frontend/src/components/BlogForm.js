import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const BlogForm = ({ handleBlogChange  }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')

  const onSubmit = (event) => {
    event.preventDefault()
    handleBlogChange(title, author, url)
    setTitle('')
    setAuthor('')
    setURL('')
  }

  const padding = {
    paddingLeft: 5
  }

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group>
        <h2>Create New</h2>
        <Form.Label style={padding}>Title:</Form.Label>
        <Form.Control
             type="text" 
             value={title} 
             name="Title"
              onChange={({ target }) => setTitle(target.value)}
        />
        <Form.Label style={padding}>Author:</Form.Label>
        <Form.Control
            type="text" 
            value={author} 
            name="Author" 
            onChange={({ target }) => setAuthor(target.value)}
        />
        <Form.Label style={padding}>URL:</Form.Label>
        <Form.Control
            type="text" 
            value={url} 
            name="URL" 
            onChange={({ target }) => setURL(target.value)}
        />
       <Button variant="primary" className="submitButton" type="submit">Create</Button>
       </Form.Group>
    </Form>
  )
}

export default BlogForm
