import { useEffect, useState } from "react";
import axios from "axios";
import { apiBaseUrl } from "../../constants";

import { Patient } from "../../types";
import { useParams } from "react-router-dom";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();

  const [patientInfo, setPatientInfo] = useState<Patient>();

  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/patients/${id}`)
      .then((response) => setPatientInfo(response.data));
  }, []);

  if (!patientInfo) return <p>Loading...</p>;

  return (
    <div>
      <h1>
        {patientInfo.name}{" "}
        {patientInfo.gender === "female"
          ? "♀"
          : patientInfo.gender === "male"
          ? "♂"
          : "⚧"}
      </h1>
      <div>
        <b>SSN:</b> {patientInfo.ssn}
      </div>
      <div>
        <b>Occupation:</b> {patientInfo.occupation}
      </div>
      <h3>Entries:</h3>
      {patientInfo.entries.map((entry) => (
        <div key={entry.id}>
          <p>
            {entry.date} <i>{entry.description}</i>
          </p>
          <ul>
            {entry.diagnosisCodes?.map((code) => (
              <li key={code}>{code}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PatientPage;
