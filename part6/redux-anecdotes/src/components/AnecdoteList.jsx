import { useDispatch, useSelector } from "react-redux";
import { vote as upVote } from "../reducers/anecdoteReducer";
import { clearNotification, setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) =>
    state.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    )
  );

  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(upVote(id));
    dispatch(
      setNotification(
        `You voted for '${anecdotes.find((a) => a.id === id).content}'`
      )
    );
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };

  return anecdotes
    .sort((a, b) => b.votes - a.votes)
    .map((anecdote) => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
    ));
};

export default AnecdoteList;
