import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
        <h1>{props.name}</h1>
    )
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick} >
   {text} 
  </button>
)

const App = () => {
  // save clicks of each button to own state
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
      Good: {good} <br/>
      Neutral: {neutral} <br/>
      Bad: {bad} <br/>
      Total: {all} <br/>
      Average: { (good - bad) / all}
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)