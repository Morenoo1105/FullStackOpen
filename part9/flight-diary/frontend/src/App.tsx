import { useEffect, useState } from "react";
import DiaryEntry from "./components/DiaryEntry";
import NewEntry from "./components/NewEntry";
import axios from "axios";
import { DiaryEntryType, NewDiaryEntryType } from "./types";
import ErrorMessage from "./components/ErrorMessage";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntryType[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const addEntry = (object: NewDiaryEntryType) => {
    axios
      .post("http://localhost:3000/api/diaries", object)
      .then((res) => {
        setDiaries(diaries.concat(res.data));
      })
      .catch((error) => {
        setErrorMessage(
          error.response.data.replace("Something went wrong. ", "")
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  useEffect(() => {
    axios
      .get<DiaryEntryType[]>("http://localhost:3000/api/diaries")
      .then((response) => {
        setDiaries(response.data);
      });
  }, []);

  return (
    <div>
      <h2>Add new entry</h2>
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
      <NewEntry addEntry={addEntry} />
      <h2>Diary entries</h2>
      {diaries.map((diary: DiaryEntryType) => (
        <DiaryEntry key={diary.id} diary={diary} />
      ))}
    </div>
  );
}

export default App;
