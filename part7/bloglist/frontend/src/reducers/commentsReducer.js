import { createSlice } from "@reduxjs/toolkit";
import commentService from "../services/comments";

const commentsSlice = createSlice({
  name: "comments",
  initialState: [],
  reducers: {
    addComment(state, action) {
      state.push(action.payload);
    },
    setComments(state, action) {
      return action.payload;
    },
  },
});

export const { addComment, setComments } = commentsSlice.actions;

export const initializeComments = (blogId) => {
  return async (dispatch) => {
    const comments = await commentService.getAll(blogId);
    dispatch(setComments(comments));
  };
};

export const createComment = (blogId, content) => {
  return async (dispatch) => {
    const newComment = await commentService.create(blogId, content);
    dispatch(addComment(newComment));
  };
};

export default commentsSlice.reducer;
