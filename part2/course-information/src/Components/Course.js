import React from 'react';
import Header from "./Header";
import Content from "./Content";

const Course = ({course}) => {
   
    const total = course.parts
    .map(part => part.exercises)
    .reduce((prev, curr) => prev + curr, 0);

    return (
      <>
        <Header title={course.name} />
        <Content parts={course.parts} />
        <p>
          <strong>Total of {total} exercises</strong>
        </p>
      </>
    );
  };
  

  

export default Course;