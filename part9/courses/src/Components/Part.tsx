import React from 'react';
import { CoursePart } from '../types';

/**
 * Helper function for exhaustive type checking
 */
 const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

const Part = ({ part }: { part: CoursePart  }) => {
    switch (part.type) {
        case 'normal':
          return (
            <div>
                <p><b>{part.name} {part.exerciseCount}</b></p>
                <p>{part.description}</p>
            </div>
          );
        case 'groupProject':
          return (
            <div>
                <p><b>{part.name} {part.exerciseCount}</b></p>
                <p>Project exercises {part.groupProjectCount}</p>
            </div>
          );
        case 'submission':
          return (
            <div>
                <p><b>{part.name} {part.exerciseCount}</b></p>
                <p>{part.description}</p>
                <p>Submit to {part.exerciseSubmissionLink}</p>
            </div>
          );
        case 'special':
          return (
            <div>
                <p><b>{part.name} {part.exerciseCount}</b></p>
                <p>{part.description}</p>
                <p>Required skills: {part.requirements}</p>
            </div>
          );
        default:
          return assertNever(part);
    }
};

export default Part