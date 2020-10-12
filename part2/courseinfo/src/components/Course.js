import React from 'react';

const Header = ({ course }) => {
    return (
      <h1>
        {course.name}
      </h1>
    ) 
  }
  
  const Total = ({ course }) => {
    const total = course.parts.reduce((s, p) => (s + p.exercises), 0)
    return (
      <p>
        <b>
          Total of {total} exercises.
        </b>
      </p>
    ) 
  }
  
  const Part = ({ part }) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>    
    )
  }
  
  const Content = ({ course }) => {
    return (
      <div>
        { course.parts.map(part => <Part key={part.id} part={part} /> )}
      </div>
    )
  }
  
  const Course = ({ course }) => {
    return (
      <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
    </div>
    )
  }

export default Course