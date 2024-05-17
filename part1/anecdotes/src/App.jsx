import { useState } from "react";

const Anecdote = ({ anecdote, votes }) => (
  <>
    <h2>{anecdote}</h2>
    <p>Currently: {votes} votes</p>
  </>
);

const Button = ({ onPress, text }) => <button onClick={onPress}>{text}</button>;

const BestAnecdote = ({ anecdote, votes }) => {
  const maxVotes = Math.max(...votes);
  const bestAnecdote = anecdote[votes.indexOf(maxVotes)];

  if (maxVotes === 0) return <p>Vote for your favorite anecdote!</p>;

  return (
    <>
      <h3>{bestAnecdote}</h3>
      <p>
        With {maxVotes} vote{maxVotes === 1 ? "" : "s"}
      </p>
    </>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const [selected, setSelected] = useState(0);

  const selectRandom = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const voteAnecdote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };

  return (
    <div>
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button onPress={selectRandom} text="Next 👉" />
      <Button onPress={voteAnecdote} text="Vote 👍" />
      <hr />
      <h1>Today's best anecdote</h1>
      <BestAnecdote anecdote={anecdotes} votes={votes} />
    </div>
  );
};

export default App;
