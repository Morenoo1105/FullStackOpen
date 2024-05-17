import React from "react";

const Form = ({ newUser, addNewUser, handleUserChange }) => {
  return (
    <form onSubmit={addNewUser}>
      <h2>Add a new Person</h2>
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
