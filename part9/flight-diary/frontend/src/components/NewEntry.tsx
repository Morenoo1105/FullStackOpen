import { SyntheticEvent, useState } from "react";
import { NewDiaryEntryType, VisibilityType, WeatherType } from "../types";

const NewEntry = ({
  addEntry,
}: {
  addEntry: (object: NewDiaryEntryType) => void;
}) => {
  const [date, setDate] = useState<string>("");
  const [visibility, setVisibility] = useState<VisibilityType>(
    VisibilityType.Great
  );
  const [weather, setWeather] = useState<WeatherType>(WeatherType.Sunny);
  const [comment, setComment] = useState<string>("");

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    addEntry({ date, visibility, weather, comment });

    setDate("");
    setVisibility(VisibilityType.Great);
    setWeather(WeatherType.Sunny);
    setComment("");
  };

  return (
    <form onSubmit={onSubmit}>
      Date:{" "}
      <input
        value={date}
        onChange={({ target }) => setDate(target.value)}
        type="date"
      />
      <br />
      <span>
        Visibility:{" "}
        <span style={{ borderRight: "1px solid black", paddingRight: 4 }}>
          <input
            onChange={() => setVisibility(VisibilityType.Great)}
            type="radio"
          />
          great
        </span>
        <span style={{ borderRight: "1px solid black", paddingRight: 4 }}>
          <input
            onChange={() => setVisibility(VisibilityType.Good)}
            type="radio"
          />
          good
        </span>
        <span style={{ borderRight: "1px solid black", paddingRight: 4 }}>
          <input
            onChange={() => setVisibility(VisibilityType.Ok)}
            type="radio"
          />
          ok
        </span>
        <span>
          <input
            onChange={() => setVisibility(VisibilityType.Poor)}
            type="radio"
          />
          poor
        </span>
      </span>
      <br />
      <span>
        Weather:{" "}
        <span style={{ borderRight: "1px solid black", paddingRight: 4 }}>
          <input onChange={() => setWeather(WeatherType.Sunny)} type="radio" />
          sunny
        </span>
        <span style={{ borderRight: "1px solid black", paddingRight: 4 }}>
          <input onChange={() => setWeather(WeatherType.Rainy)} type="radio" />
          rainy
        </span>
        <span style={{ borderRight: "1px solid black", paddingRight: 4 }}>
          <input onChange={() => setWeather(WeatherType.Cloudy)} type="radio" />
          cloudy
        </span>
        <span style={{ borderRight: "1px solid black", paddingRight: 4 }}>
          <input onChange={() => setWeather(WeatherType.Stormy)} type="radio" />
          stormy
        </span>
        <span>
          <input onChange={() => setWeather(WeatherType.Windy)} type="radio" />
          windy
        </span>
      </span>
      <br />
      Comment:{" "}
      <input
        value={comment}
        onChange={({ target }) => setComment(target.value)}
        type="text"
      />
      <br />
      <button type="submit">Add</button>
    </form>
  );
};

export default NewEntry;
