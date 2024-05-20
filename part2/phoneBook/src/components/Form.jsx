import React from "react";
import Notification from "./Notification";

const Form = ({ newUser, addNewUser, handleUserChange, notification }) => {
  return (
    <form onSubmit={addNewUser}>
      <h2>Add a new Person</h2>
      {notification && <Notification message={notification} />}
      <div>
        Name:{" "}
        <input
          value={newUser.name}
          onChange={(event) => handleUserChange("name", event)}
        />
      </div>
      <div>
        Phone:{" "}
        <input
          value={newUser.phone}
          onChange={(event) => handleUserChange("phone", event)}
        />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

export default Form;
