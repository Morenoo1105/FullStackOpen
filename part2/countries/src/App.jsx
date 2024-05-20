import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Countries from "./components/Countries";
import axios from "axios";

function App() {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  return (
    <div>
      <h1>Country Search</h1>
      <Filter filter={filter} setFilter={setFilter} />
      <hr />
      <Countries countries={countries} filter={filter} />
      <hr />
    </div>
  );
}

export default App;
