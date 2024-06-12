import axios from "axios";

const BASE_URL = "http://localhost:3001/anecdotes";

export const getAnecdotes = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const createAnecdote = async (content) => {
  const anecdote = { content, votes: 0 };
  const response = await axios.post(BASE_URL, anecdote);
  return response.data;
};

export const voteAnecdote = async (anecdote) => {
  const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
  const response = await axios.put(
    `${BASE_URL}/${anecdote.id}`,
    updatedAnecdote
  );
  return response.data;
};
