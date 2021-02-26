import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'NEW_VOTE':
       return state.map(post => post.id === action.data ? {...post, votes: post.votes + 1}: post)
    case 'INIT_ANECDOTES':      
       return action.data
    default: 
      return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const newAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const newVote = (anecdote) => {
  return async dispatch => {
    await anecdoteService.vote({...anecdote, votes: anecdote.votes + 1})
    dispatch({
      type: 'NEW_VOTE',
      data: anecdote.id
    })
  }
}

export default anecdoteReducer