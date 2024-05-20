import { useEffect, useState } from "react";
import axios from "axios";

const Weather = ({ city }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&appid=" +
          import.meta.env.VITE_WEATHER_API_KEY
      )
      .then((response) => {
        setWeather(response.data);
        console.log(response.data);
      });
  }, []);

  return (
    <div>
      <h3>Weather in {city}</h3>

      <div>
        <h4>
          Temperature: <span>{parseInt(weather.main.temp - 273)} ºC</span>
        </h4>
        <h5>
          {weather.weather[0].main} ({weather.weather[0].description})
        </h5>
        <h5>Wind: {weather.wind.speed} m/s</h5>
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt="Weather icon"
        />
      </div>
    </div>
  );
};

export default Weather;
