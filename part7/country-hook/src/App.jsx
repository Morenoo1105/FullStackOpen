import React, { useState, useEffect } from "react";
import axios from "axios";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);
  const [found, setFound] = useState(false);

  const fetchCountry = async () => {
    if (!name) return;

    try {
      const response = await fetch(
        `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch country data");
      }

      const data = await response.json();

      if (data) {
        setCountry(data);
        setFound(true);
      }
    } catch (error) {
      console.log("Error fetching country data:", error);
      setCountry(null);
      setFound(false);
    }
  };

  useEffect(() => {
    fetchCountry();
  }, [name]);

  return { data: country, found };
};

const Country = ({ country }) => {
  if (!country.data) {
    return null;
  }

  if (!country.found) {
    return <div>not found...</div>;
  }

  console.log("Country data:", country.data);

  return (
    <div>
      <h3>{country.data.name.common} </h3>
      <div>capital {country.data.capital[0]} </div>
      <div>population {country.data.population}</div>
      <img
        src={country.data.flags.png}
        height="100"
        alt={`flag of ${country.data.name}`}
      />
    </div>
  );
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
