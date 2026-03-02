import React, { useState } from "react";
import ReactDOM from "react-dom";

const Header = ({ text }) => {
  return <h1>{text}</h1>;
};

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};
const GetRandomInt = () => {
  //let min = 0;
  let max = anecdotes.length;
  return Math.floor(Math.random() * max);
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const App = (props) => {
  const [selected, setSelected] = useState(GetRandomInt);
  const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0));
  const [max, setMax] = useState(GetRandomInt);

  const vote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    if (copy[selected] > votes[max]) {
      setMax(selected);
    }
    setVotes(copy);
  };

  const setToRandom = () => {
    setSelected(GetRandomInt);
  };

  return (
    <div>
      <Header text="Anecdote of the day" />
      {props.anecdotes[selected]}
      <p>Votes: {votes[selected]}</p>
      <Button onClick={vote} text="Vote" />
      <Button onClick={setToRandom} text="Next Anecdote" />
      <Header text="Anecdote with most votes" />
      {props.anecdotes[max]}
    </div>
  );
};

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
