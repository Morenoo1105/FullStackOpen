import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { initializeUser, logoutUser } from "../reducers/userReducer";

const NavBar = ({ notify }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeUser());
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
    notify(`Bye, ${user.name}!`);
  };

  return (
    <nav className="bg-emerald-400">
      <div className="container mx-auto flex p-4 items-center justify-start">
        <div className="flex items-center font-bold capitalize gap-10 [&>a]:transition-transform [&>a]:scale-100 hover:[&>a]:scale-90">
          <Link to="/">home</Link>
          <Link to="/users">users</Link>
        </div>

        <div className="w-0.5 h-6 bg-white mx-5" />

        <div className="flex items-center gap-6">
          <span>
            <span className="font-mono underline decoration underline-offset-4">
              {user.name}
            </span>{" "}
            logged in
          </span>
          <button
            className="bg-white hover:opacity-85 opacity-100 rounded-full px-4 py-1 capitalize"
            onClick={handleLogout}
          >
            logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
