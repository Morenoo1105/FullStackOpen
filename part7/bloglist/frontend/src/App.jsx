import { useEffect, createRef } from "react";

import Login from "./components/Login";
import Blog from "./components/Blog";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import {
  createBlog,
  initializeBlogs,
  removeBlog,
  upVoteBlog,
} from "./reducers/blogReducer";
import { initializeUser, logUser, logoutUser } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();

  const blogs = useSelector((state) => state.blogs);
  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeUser());
  }, []);

  const blogFormRef = createRef();

  const notify = (message, type = "success") => {
    dispatch(setNotification({ message, type }, 5000));
  };

  const handleLogin = async (credentials) => {
    try {
      dispatch(logUser(credentials));

      notify(`Welcome back!`);
    } catch (error) {
      console.log("error: ", error);
      notify("Wrong credentials", "error");
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    notify(`Bye, ${user.name}!`);
  };

  const handleCreate = async (blog) => {
    dispatch(createBlog(blog));
    notify(`Blog created: ${blog.title}, ${blog.author}`);
    blogFormRef.current.toggleVisibility();
  };

  const handleVote = async (blog) => {
    dispatch(
      upVoteBlog(blog.id, {
        ...blog,
        likes: blog.likes + 1,
      })
    );

    notify(`You liked ${blog.title} by ${blog.author}`);
  };

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog.id));
      notify(`Blog ${blog.title}, by ${blog.author} removed`);
    }
  };

  if (!user) {
    return (
      <div>
        <h2>blogs</h2>
        <Notification />
        <Login doLogin={handleLogin} />
      </div>
    );
  }

  const byLikes = (a, b) => b.likes - a.likes;

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </div>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <NewBlog doCreate={handleCreate} />
      </Togglable>
      {[...blogs].sort(byLikes).map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleVote={handleVote}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default App;
