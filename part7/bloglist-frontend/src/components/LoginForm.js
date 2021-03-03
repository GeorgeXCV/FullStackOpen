import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin  }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = (event) => {
    event.preventDefault()
    handleLogin(username, password)
    setUsername('')
    setPassword('')
  }

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
        />
        <Form.Label>Password</Form.Label>
        <Form.Control
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
        />
      <Button variant="primary" className="loginButton" type="submit">Login</Button>
      </Form.Group>
    </Form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
}

export default LoginForm
