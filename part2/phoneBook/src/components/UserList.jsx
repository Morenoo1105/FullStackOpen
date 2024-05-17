const UserItem = ({ user }) => {
  return (
    <p>
      {user.id}. {user.name} - {user.phone}
    </p>
  );
};

const UserList = ({ users, filter }) => {
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
        <UserItem key={user.name} user={user} />
      ))}
    </section>
  );
};

export default UserList;
