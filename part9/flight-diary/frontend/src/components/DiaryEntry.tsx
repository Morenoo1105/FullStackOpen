import { DiaryEntryType } from "../types";

const DiaryEntry = ({ diary }: { diary: DiaryEntryType }) => {
  return (
    <p key={diary.id}>
      <b>{diary.date}</b>
      <br />
      Visibility: <i>{diary.visibility}</i>
      <br />
      Weather: <i>{diary.weather}</i>
    </p>
  );
};

export default DiaryEntry;
