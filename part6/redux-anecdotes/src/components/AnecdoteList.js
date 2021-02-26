import React from 'react'
import { connect } from 'react-redux'
import { newVote } from '../reducers/anecdoteReducer'
import { newNotification } from '../reducers/notificationReducer'

const AnecdoteList  = (props) => {
    const anecdotes = props.anecdotes
  
    const vote = (anecdote) => {
        props.newVote(anecdote)  
        props.newNotification(`You voted ${anecdote.content}`, 5)
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
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        )}
      </div>
    )
}

const mapDispatchToProps = {
  newVote,
  newNotification
}

const mapStateToProps = (state) => {
  const filter = state.filter
  const anecdotes = state.anecdotes
  if (!filter) {
    return  { anecdotes }
  } else {
    return { anecdotes: anecdotes.filter(anecdote => anecdote.content.indexOf(filter) > 0) }
  }
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdoteList