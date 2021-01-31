import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => {setGood(good + 1)}
  const addNeutral = () => {setNeutral(neutral + 1)}
  const addBad = () => {setBad(bad + 1)}

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button text="Good" handleClick={addGood}/>
      <Button text="Neutral" handleClick={addNeutral}/>
      <Button text="Bad" handleClick={addBad}/>
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({good, neutral, bad}) => {

  if (good === 0 && neutral === 0 && bad === 0) {
     return (
      <p>No feedback given</p>
     )
  } else {
    const total = (good + neutral + bad);
    const average = ((good - bad) / total).toFixed(2);
    const positive = (good / total * 100).toFixed(2) + "%";
    return (
    <table>
      <tbody>
      <Statistic text = "Good: " value = {good} />
      <Statistic text = "Neutral: " value = {neutral} />
      <Statistic text = "Bad: " value = {bad} />
      <Statistic text = "Total: " value = {total} />
      <Statistic text = "Average: " value = {average} />
      <Statistic text = "Positive: " value = {positive} />
      </tbody>
    </table>
    )
  }
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)