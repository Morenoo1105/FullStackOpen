import { useEffect, useState } from "react";
import UserList from "./components/UserList";
import Form from "./components/Form";
import Filter from "./components/Filter";

import userService from "./services/users";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", phone: "", id: "" });

  const [filter, setFilter] = useState("");

  const handleUserChange = (field, event) =>
    setNewUser({ ...newUser, [field]: event.target.value });

  const addNewUser = (event) => {
    event.preventDefault();

    if (!newUser.name) return alert("Please enter a name.");
    if (!newUser.phone) return alert("Please enter a phone number.");

    if (persons.some((person) => person.name === newUser.name)) {
      if (
        window.confirm(
          `"${newUser.name}" already exists in the phonebook. Would you like to replace the old number with the new one?`
        )
      ) {
        const updatingPerson = persons.find(
          (person) => person.name === newUser.name
        );
        const updatedPerson = { ...updatingPerson, phone: newUser.phone };

        userService
          .update(updatingPerson.id, updatedPerson)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id !== updatingPerson.id ? person : response.data
              )
            );
            setNewUser({ name: "", phone: "", id: "" });
          });
      }
      return;
    }

    if (persons.some((person) => person.phone === newUser.phone)) {
      const updatingPerson = persons.find(
        (person) => person.phone === newUser.phone
      );
      if (
        window.confirm(
          `"${newUser.phone}" belongs to ${updatingPerson.name} in the phonebook. Would you like to replace the old owner with the new one?`
        )
      ) {
        const updatedPerson = { ...updatingPerson, name: newUser.name };

        userService
          .update(updatingPerson.id, updatedPerson)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id !== updatingPerson.id ? person : response.data
              )
            );
            setNewUser({ name: "", phone: "", id: "" });
          });
      }
      return;
    }

    userService
      .create({
        ...newUser,
        // Calculates next id (by default it was generating an alphanumeric id)
        id: (persons.length + 1).toString(),
      })
      .then((response) => {
        setPersons([...persons, response.data]);
        setNewUser({ name: "", phone: "", id: "" });
      });
  };

  const deleteUser = (id) => {
    const user = persons.find((p) => p.id === id);

    const accept = window.confirm(`Delete ${user.name} profile?`);

    if (accept) {
      userService.deleteUser(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  useEffect(() => {
    userService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

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
      <UserList users={persons} filter={filter} deletion={deleteUser} />
    </div>
  );
};

export default App;
