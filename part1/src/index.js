import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const [ counter, setCounter ] = useState(0)
  const increaseByOne = () => setCounter(counter + 1)
  const decreaseByOne = () => setCounter(counter - 1)
  const setToZero = () => setCounter(0)

  return (
    <div>
      <div>{counter}</div>
      <button onClick={increaseByOne}>
        Add 1
      </button>
      <button onClick={decreaseByOne}>
        Subtract 1
      </button>
      <button onClick={setToZero}>
        Reset
      </button>
    </div>
  )
}

ReactDOM.render(
  <App />, 
  document.getElementById('root')
)