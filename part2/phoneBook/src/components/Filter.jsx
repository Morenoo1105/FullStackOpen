import React from "react";

const Filter = ({ filter, setFilter }) => {
  return (
    <section>
      <span>
        <b>Filter by name or phone number: </b>
      </span>
      <input
        type="text"
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
      />
    </section>
  );
};

export default Filter;
