import { useState } from "react";
import UserList from "./components/UserList";
import Form from "./components/Form";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "040-123456", id: 1 },
    { name: "Ada Lovelace", phone: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", phone: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", phone: "39-23-6423122", id: 4 },
  ]);
  const [newUser, setNewUser] = useState({ name: "", phone: "", id: "" });

  const [filter, setFilter] = useState("");

  const handleUserChange = (field, event) =>
    setNewUser({ ...newUser, [field]: event.target.value });

  const addNewUser = (event) => {
    event.preventDefault();

    if (!newUser.name) return alert("Please enter a name.");
    if (!newUser.phone) return alert("Please enter a phone number.");

    if (persons.some((person) => person.name === newUser.name))
      return alert(`"${newUser.name}" already exists in the phonebook.`);

    if (persons.some((person) => person.phone === newUser.phone))
      return alert(
        `Phone number "${newUser.phone}" already exists in the phonebook.`
      );

    setPersons([...persons, { ...newUser, id: persons.length + 1 }]);
    setNewUser({ name: "", phone: "", id: "" });
  };

  return (
    <div>
      <h1>Phone Book</h1>
      <Filter filter={filter} setFilter={setFilter} />
      <hr />
      <Form
        newUser={newUser}
        addNewUser={addNewUser}
        handleUserChange={handleUserChange}
      />
      <hr />
      <UserList users={persons} filter={filter} />
    </div>
  );
};

export default App;
