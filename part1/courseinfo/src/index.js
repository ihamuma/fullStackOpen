import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.name}: {props.exercises}</p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part name={props.content[0].name} exercises={props.content[0].exercises} />
      <Part name={props.content[1].name} exercises={props.content[1].exercises} />
      <Part name={props.content[2].name} exercises={props.content[2].exercises} />
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Total exercises: {props.tosum[0].exercises + props.tosum[1].exercises + props.tosum[2].exercises}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  const all = [part1, part2, part3]

  return (
    <div>
      <Header course={course} />
      <Content content={all}/>
      <Total tosum={all} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))