import { useEffect, useState } from "react";
import userService from "../services/users";

const UserItem = ({ user, deletion }) => {
  return (
    <p>
      <span>
        {user.id}. {user.name} - {user.phone}
      </span>{" "}
      <button onClick={() => deletion(user.id)}>X</button>
    </p>
  );
};

const UserList = ({ users, filter, deletion }) => {
  const filteredUsersByName = users.filter((user) =>
    user.name.toLowerCase().includes(filter.toLowerCase())
  );
  const filteredUsersByPhone = users.filter((user) =>
    user.phone.includes(filter)
  );
  const filteredUsers = filter
    ? filteredUsersByName.concat(filteredUsersByPhone)
    : users;

  return (
    <section>
      <h2>List of Phone Numbers</h2>
      {filteredUsers.map((user) => (
        <UserItem key={user.name} user={user} deletion={deletion} />
      ))}
    </section>
  );
};

export default UserList;
