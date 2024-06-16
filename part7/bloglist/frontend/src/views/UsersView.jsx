import React, { useEffect, useState } from "react";
import userService from "../services/users";
import { Link, useNavigate } from "react-router-dom";

const UsersView = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    userService.getAll().then((users) => {
      setUsers(users);
    });
  }, []);

  const navigate = useNavigate();

  return (
    <div>
      <h2 className="text-2xl mb-2 font-bold text-emerald-400 underline underline-offset-4 decoration-2">
        Users
      </h2>
      <div>
        <table className="text-left text-sm whitespace-nowrap rounded-t-xl overflow-hidden">
          <thead className="uppercase tracking-wider border-b-2 border-emerald-200">
            <tr className="bg-emerald-200">
              <th scope="col" className="px-6 py-4">
                User name
              </th>
              <th scope="col" className="px-6 py-4">
                Blogs created
              </th>
            </tr>
          </thead>

          <tbody>
            {users?.map((user) => (
              <tr
                key={user.id}
                onClick={() => navigate(`/users/${user.id}`)}
                className="border-b border-emerald-200 hover:bg-emerald-100 cursor-pointer"
              >
                <th scope="row" className="px-6 py-4">
                  {user.name}
                </th>
                <td className="px-6 py-4">{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersView;
