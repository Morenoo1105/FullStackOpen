import { useEffect } from "react";

import Login from "./components/Login";
import Notification from "./components/Notification";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import { initializeUser, logUser } from "./reducers/userReducer";
import { Route, Routes } from "react-router-dom";
import HomeView from "./views/HomeView";
import UsersView from "./views/UsersView";
import SingleUserView from "./views/SingleUserView";
import SingleBlogView from "./views/SingleBlogView";
import NavBar from "./components/NavBar";

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeUser());
  }, []);

  const notify = (message, type = "success") => {
    dispatch(setNotification({ message, type }, 5000));
  };

  const handleLogin = (credentials) => {
    dispatch(logUser(credentials)).catch((error) => {
      console.log("error: ", error);
      notify(error.response.data.error, "error");
    });
    notify(`Welcome back!`);
  };

  if (!user) {
    return (
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold font-serif my-4">BLOGS</h2>
        <Notification />
        <Login doLogin={handleLogin} />
      </div>
    );
  }

  return (
    <>
      <NavBar notify={notify} />
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold font-serif my-4">BLOGS</h2>
        <Notification />

        <Routes>
          <Route path="/" element={<HomeView notify={notify} />} />
          <Route
            path="/blogs/:id"
            element={<SingleBlogView notify={notify} />}
          />
          <Route path="/users" element={<UsersView />} />
          <Route path="/users/:id" element={<SingleUserView />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
