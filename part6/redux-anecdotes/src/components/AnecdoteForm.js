import React from 'react'
import { connect } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { newNotification } from '../reducers/notificationReducer'

const AnecdoteForm  = (props) => {
    const addAnecdote = async (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.newAnecdote({content: anecdote, votes: 0})
        props.newNotification(`You created ${anecdote}`, 5)
      }

    return (
        <div>
        <h2>Create New</h2>
        <form onSubmit={addAnecdote}>
            <div><input name="anecdote" /></div>
            <button>Create</button>
        </form>
        </div>
    )
}

const mapDispatchToProps = {
    newAnecdote,
    newNotification
}

const ConnectedAnecdoteForm = connect(null ,mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm