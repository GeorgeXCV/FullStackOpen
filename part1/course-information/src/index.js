import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  } 

  const total = course.parts
  .map(part => part.exercises)
  .reduce((prev, curr) => prev + curr, 0);

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={total} />
    </div>
  )
}

const Header = (props) => {  
  return <h1>{props.course}</h1>
}

const Part = ({name, exercise}) => {  
  return <p>{name} {exercise}</p> 
}

const Content = ({parts}) => {  
  return parts.map(part => 
  (
    <Part name={part.name} exercise={part.exercises}/>   
  ))
}

const Total = (props) => {  
  return (
    <p>Number of exercises {props.total}</p>    
 )
}

ReactDOM.render(<App />, document.getElementById('root'))