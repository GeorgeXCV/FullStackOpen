import React from 'react';
import Header from './Components/Header'
import Content from './Components/Content'
import Total from './Components/Total'
import { CoursePart } from './types';

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs ", "jest"],
      type: "special"
    }
  ]
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