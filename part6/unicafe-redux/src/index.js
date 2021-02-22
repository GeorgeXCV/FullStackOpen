import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {

  const updateState = (state) => {store.dispatch({type: state})}

  const good = () => {
    updateState('GOOD')
  }

  const neutral = () => {
    updateState('OK')
  }

  const bad = () => {
    updateState('BAD')
  }

  const zero = () => {
    updateState('ZERO')
  }

  return (
    <div>
      <button onClick={good}>Good</button> 
      <button onClick={neutral}>Neutral</button> 
      <button onClick={bad}>Bad</button>
      <button onClick={zero}>Reset stats</button>
      <div>Good {store.getState().good}</div>
      <div>Neutral {store.getState().ok}</div>
      <div>Bad {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
