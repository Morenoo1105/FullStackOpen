import { useEffect } from "react";
import { useState } from "react";
import Country from "./Country";

const Countries = ({ countries, filter }) => {
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    filter.length > 0
      ? setFilteredList(
          countries.filter((country) =>
            country.name.common.toLowerCase().includes(filter.toLowerCase())
          )
        )
      : setFilteredList(countries);
  }, [filter]);

  if (filter.length === 0) {
    return <p>Please write something.</p>;
  }

  if (filteredList.length >= 10) {
    return <p>Too many matches, please be more precise</p>;
  }

  if (filteredList.length > 1 && filteredList.length < 10) {
    return (
      <ul>
        {filteredList.map((country) => (
          <li key={country.name.common}>
            {country.name.common}{" "}
            <button onClick={() => setFilteredList([country])}>Show</button>
          </li>
        ))}
      </ul>
    );
  }

  if (filteredList.length === 1) {
    return <Country country={filteredList[0]} />;
  }
};

export default Countries;
