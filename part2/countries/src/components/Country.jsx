import Weather from "./Weather";

const Country = ({ country }) => {
  return (
    <ul>
      <img src={country.flags.png} />
      <li>
        <h2>{country.name.common}</h2>
      </li>
      <li>
        <h5>Capital: {country.capital[0]}</h5>
      </li>
      <li>
        <h5>Population: {country.population} inhabitants</h5>
      </li>
      <li>
        <h5>
          Languages:{" "}
          {Object.values(country.languages).map((lang) => (
            <span key={lang}>{lang}, </span>
          ))}
        </h5>
      </li>
      <Weather city={country.capital[0]} />
    </ul>
  );
};

export default Country;
