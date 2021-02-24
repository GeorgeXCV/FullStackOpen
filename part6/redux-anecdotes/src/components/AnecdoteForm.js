import React from 'react'
import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm  = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(newAnecdote(content))    
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