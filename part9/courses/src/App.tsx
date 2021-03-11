import React from 'react';
import Header from './Components/Header'
import Content from './Components/Content'
import Total from './Components/Total'

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];
  const totalExercises = courseParts.reduce((i, {exerciseCount}) => i + exerciseCount, 0)

  return (
    <div>
    <Header name={courseName} />
    <Content parts={courseParts} />
    <Total totalExercises={totalExercises} />
  </div>
  );
};

export default App;