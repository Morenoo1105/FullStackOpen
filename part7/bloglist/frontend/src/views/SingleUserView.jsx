import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import userService from "../services/users";

const SingleUserView = () => {
  const { id } = useParams();

  const [user, setUser] = useState();

  useEffect(() => {
    userService
      .getSingleUser(id)
      .then((user) => {
        setUser(user);
      })
      .catch((error) => {});
  }, [id]);

  return (
    <div>
      <div>
        <h2 className="text-2xl mb-2 font-bold text-emerald-400 underline-offset-4 decoration-2">
          User: <span className="underline">{user?.username}</span>
        </h2>
      </div>
      <div>
        <h4 className="text-lg mb-2 font-medium text-emerald-400 underline-offset-4 decoration-2">
          Added blogs
        </h4>
        <ul className="rounded-xl border-2 border-emerald-400 w-fit px-4 py-2">
          {user?.blogs.map((blog, index) => (
            <li className="w-full" key={blog.id}>
              <Link
                to={`/blogs/${blog.id}`}
                className="text-inherit hover:text-emerald-400 hover:underline underline-offset-2"
              >
                <span>{blog.title}</span>
              </Link>
              {index < user?.blogs.length - 1 && (
                <div className="w-[90%] mx-auto h-px bg-emerald-400/50 my-2" />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SingleUserView;
