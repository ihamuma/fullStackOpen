import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ name }) => {
    return (
        <h1>{name}</h1>
    )
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick} >
   {text} 
  </button>
)

const Average = ({ good, bad, all }) => {
  if (all === 0 || (good - bad) === 0) {
    return (
      <div>Average: 0</div>
    )
  } else {
    return (
      <div>Average: {(good - bad / all)}</div>
    )
  }
}

const Positive = ({ good, all }) => {
  if (all === 0 || good === 0) {
    return (
      <div>Positive: 0%</div>
    )
  } else {
    return (
      <div>Positive: {(good / all) * 100}%</div>
    )
  }
}

const Statistics = (props) => {
  return (
    <div>
      Good: {props.good} <br/>
      Neutral: {props.neutral} <br/>
      Bad: {props.bad} <br/>
      Total: {props.all} <br/>
      <Average good={props.good} bad={props.bad} all={props.all} />
      <Positive good={props.good} all={props.all} />
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    setAll(all + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }
  
  const handleBadClick = () => {
    setBad(bad + 1)
    setAll(all + 1)
  }
  
  return (
    <div>
      <Header name={"Give Feedback"} />
      <Button onClick={handleGoodClick} text='good' />
      <Button onClick={handleNeutralClick} text='neutral' />
      <Button onClick={handleBadClick} text='bad' />
      <Header name={"Statistics"} />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)