import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { newVote } from '../reducers/anecdoteReducer'
import { newNotification, dismissNotification } from '../reducers/notificationReducer'

const AnecdoteList  = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => {
      const filter = state.filter
      const anecdotes = state.anecdotes
      if (!filter) {
        return anecdotes
      } else {
        return anecdotes.filter(anecdote => anecdote.content.indexOf(filter) > 0)
      }
    })

    const vote = (id, anecdote) => {
        dispatch(newVote(id))  
        dispatch(newNotification(`You voted ${anecdote}`)) 
        setTimeout(() => {
          dispatch(dismissNotification())
        }, 5000)
      }
 
    return (
        <div>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
            </div>
          </div>
        )}
      </div>
    )
}

export default AnecdoteList 