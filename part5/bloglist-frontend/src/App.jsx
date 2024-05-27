import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Message from "./components/Message";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState({ text: null, error: null });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

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

  const handleBlogPost = async (event) => {
    event.preventDefault();

    if (title === "" || author === "" || url === "") {
      setMessage({ text: "Please fill all fields", error: true });
      setTimeout(() => {
        setMessage({ text: null, error: null });
      }, 5000);
      return;
    }

    const createdBlog = await blogService.create({
      title,
      author,
      url,
    });
    setBlogs(blogs.concat(createdBlog));
    setMessage({
      text: `A new blog ${title} by ${author} added`,
      error: false,
    });
    setTimeout(() => {
      setMessage({ text: null, error: null });
    }, 5000);
    setTitle("");
    setAuthor("");
    setUrl("");
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
      <h3>New Blog Entry</h3>
      <form onSubmit={handleBlogPost}>
        <div>
          title
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>

      <hr />

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
