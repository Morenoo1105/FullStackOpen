import { useState } from "react";

const Login = ({ doLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    doLogin({ username, password });
    setUsername("");
    setPassword("");
  };

  return (
    <form
      className="flex flex-col items-start max-w-fit"
      onSubmit={handleLogin}
    >
      <label className="flex flex-col">
        Username
        <input
          className="border border-emerald-400 px-2 py-1 mb-2 rounded-xl"
          type="text"
          data-testid="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label className="flex flex-col">
        Password
        <input
          className="border border-emerald-400 px-2 py-1 mb-2 rounded-xl"
          type="password"
          value={password}
          data-testid="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <input
        className=" bg-emerald-400 opacity-100 hover:opacity-75 cursor-pointer rounded-full font-semibold w-full px-5 py-2 mt-4"
        type="submit"
        value="Login"
      />
    </form>
  );
};

export default Login;
