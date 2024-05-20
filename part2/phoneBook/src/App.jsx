import { useEffect, useState } from "react";
import UserList from "./components/UserList";
import Form from "./components/Form";
import Filter from "./components/Filter";

import userService from "./services/users";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", phone: "" });
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    userService
      .getAll()
      .then((response) => {
        setPersons(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
                person.id !== updatingPerson.id ? person : response
              )
            );
            setNotification({
              message: `Phone number updated to ${newUser.phone}`,
              error: false,
            });
            setNewUser({ name: "", phone: "" });
            setTimeout(() => {
              setNotification(null);
            }, 5000);
          })
          .catch((error) => {
            setNotification({
              message: `Information of ${newUser.name} has already been removed from the server.`,
              error: true,
            });
            setPersons(
              persons.filter((person) => person.id !== updatingPerson.id)
            );
            setNewUser({ name: "", phone: "" });
            setTimeout(() => {
              setNotification(null);
            }, 5000);
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
                person.id !== updatingPerson.id ? person : response
              )
            );
            setNotification({
              message: `Phone owner updated to ${newUser.name}`,
              error: false,
            });
            setNewUser({ name: "", phone: "" });
            setTimeout(() => {
              setNotification(null);
            }, 5000);
          })
          .catch((error) => {
            setNotification({
              message: `Number ${newUser.phone} has already been removed from the server.`,
              error: true,
            });
            setPersons(
              persons.filter((person) => person.id !== updatingPerson.id)
            );
            setNewUser({ name: "", phone: "" });
            setTimeout(() => {
              setNotification(null);
            }, 5000);
          });
      }
      return;
    }

    userService.create(newUser).then((response) => {
      console.log(response);
      setPersons(response);
      setNotification({
        message: `User ${newUser.name} added to the phonebook.`,
        error: false,
      });
      setNewUser({ name: "", phone: "" });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    });
  };

  const deleteUser = (id) => {
    const user = persons.find((p) => p.id === id);

    const accept = window.confirm(`Delete ${user.name} profile?`);

    if (accept) {
      userService
        .deleteUser(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setNotification({
            message: `User ${user.name} deleted from the phonebook.`,
            error: false,
          });
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        })
        .catch((error) => {
          setPersons(persons.filter((person) => person.id !== id));
          setNotification({
            message: `Information of ${user.name} has already been removed from the server.`,
            error: true,
          });
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        });
    }
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
        notification={notification}
      />
      <hr />
      <UserList users={persons} filter={filter} deletion={deleteUser} />
    </div>
  );
};

export default App;
