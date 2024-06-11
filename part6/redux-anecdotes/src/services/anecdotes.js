import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createAnecdote = async (content) => {
  const object = { content, votes: 0 };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const upVote = async (id) => {
  const { data: anecdote } = await axios.get(`${baseUrl}/${id}`);
  const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
  const newAnecdote = await axios.put(`${baseUrl}/${id}`, updatedAnecdote);
  return newAnecdote.data;
};

export default { getAll, createAnecdote, upVote };
