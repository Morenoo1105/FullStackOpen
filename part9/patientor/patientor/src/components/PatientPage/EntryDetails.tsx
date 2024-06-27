import {
  FavoriteRounded,
  HealthAndSafety,
  LocalHospital,
  WorkRounded,
} from "@mui/icons-material";
import {
  Entry,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from "../../types";

const HospitalEntryComponent = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <>
      <h3>
        {entry.date} <LocalHospital />
      </h3>
      <p>{entry.description}</p>
      <p>Discharge: {entry.discharge.date}</p>
      <p>Criteria: {entry.discharge.criteria}</p>
      <p>
        Diagnose by: <i>{entry.specialist}</i>
      </p>
    </>
  );
};

const HealthCheckEntryComponent = ({ entry }: { entry: HealthCheckEntry }) => {
  return (
    <>
      <h3>
        {entry.date} <HealthAndSafety />
      </h3>
      <p>{entry.description}</p>
      <FavoriteRounded
        htmlColor={
          entry.healthCheckRating === 0
            ? "green"
            : entry.healthCheckRating === 1
            ? "yellow"
            : entry.healthCheckRating === 2
            ? "orange"
            : entry.healthCheckRating === 3
            ? "red"
            : "black"
        }
      />
      <p>
        Diagnose by: <i>{entry.specialist}</i>
      </p>
    </>
  );
};

const OccupationalHealthcareEntryComponent = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => {
  return (
    <>
      <h3>
        {entry.date} <WorkRounded /> {entry.employerName}
      </h3>
      <p>{entry.description}</p>
      {entry.sickLeave && (
        <p>
          Sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
        </p>
      )}
      <p>
        Diagnose by: <i>{entry.specialist}</i>
      </p>
    </>
  );
};

const EntryDetails = ({ entry }: { entry: Entry }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryComponent entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntryComponent entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryComponent entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
