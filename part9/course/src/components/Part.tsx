import { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case "basic":
      return (
        <div style={{ marginBottom: 14 }}>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <br />
          <i>{part.description}</i>
        </div>
      );
    case "group":
      return (
        <div style={{ marginBottom: 14 }}>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <br />
          project exercises: {part.groupProjectCount}
        </div>
      );
    case "background":
      return (
        <div style={{ marginBottom: 14 }}>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <br />
          <i>{part.description}</i>
          <br />
          background material: {part.backgroundMaterial}
        </div>
      );
    case "special":
      return (
        <div style={{ marginBottom: 14 }}>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <br />
          <i>{part.description}</i>
          <br />
          required skills: {part.requirements.join(", ")}
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
