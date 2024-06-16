import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    vote(state, action) {
      const blogToChange = action.payload;

      return state
        ? state.map((blog) =>
            blog.id !== blogToChange.id ? blog : blogToChange
          )
        : state.push(blogToChange);
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    deleteBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
  },
});

export const { vote, appendBlog, setBlogs, deleteBlog } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content);
    dispatch(appendBlog(newBlog));
  };
};

export const upVoteBlog = (blogId, blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(blogId, blog);
    dispatch(vote(updatedBlog.id));
  };
};

export const removeBlog = (blogId) => {
  return async (dispatch) => {
    await blogService.remove(blogId);
    dispatch(deleteBlog(blogId));
  };
};

export default blogSlice.reducer;
