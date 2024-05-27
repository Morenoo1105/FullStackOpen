import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Message from "./components/Message";
import Togglable from "./components/Togglable";
import PostBlog from "./components/PostBlog";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState({ text: null, error: null });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));

    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);

      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setMessage({ text: "Wrong credentials", error: true });
      setTimeout(() => {
        setMessage({ text: null, error: null });
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
  };

  const handleBlogPost = async (blogData) => {
    if (
      blogData.title === "" ||
      blogData.author === "" ||
      blogData.url === ""
    ) {
      setMessage({ text: "Please fill all fields", error: true });
      setTimeout(() => {
        setMessage({ text: null, error: null });
      }, 5000);
      return;
    }
    blogFormRef.current.toggleVisibility();

    const createdBlog = await blogService.create(blogData);
    setBlogs(blogs.concat(createdBlog));
    setMessage({
      text: `A new blog ${blogData.title} by ${blogData.author} added`,
      error: false,
    });
    setTimeout(() => {
      setMessage({ text: null, error: null });
    }, 5000);
  };

  const handleLike = async (blog) => {
    const likedBlog = await blogService.like(blog);
    setBlogs(
      blogs.map((blog) =>
        blog.id === likedBlog.id ? { ...blog, likes: likedBlog.likes } : blog
      )
    );
  };

  if (user === null) {
    return (
      <div>
        <h2>Please Log In</h2>
        {message.text && <Message {...message} />}
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  }
  return (
    <div>
      <h2>blogs</h2>
      <h4>
        Logged in as {user.name} <button onClick={handleLogout}>Log out</button>
      </h4>
      <hr />
      {message.text && <Message {...message} />}
      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <PostBlog handleBlogPost={handleBlogPost} />
      </Togglable>

      <hr />

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} handleLike={() => handleLike(blog)} />
      ))}
    </div>
  );
};

export default App;
