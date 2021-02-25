import React from 'react'
import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { newNotification, dismissNotification } from '../reducers/notificationReducer'

const AnecdoteForm  = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(newAnecdote(content))
        dispatch(newNotification(`You created ${content}`))    
        setTimeout(() => {
            dispatch(dismissNotification())
        }, 5000)
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

export default AnecdoteForm 