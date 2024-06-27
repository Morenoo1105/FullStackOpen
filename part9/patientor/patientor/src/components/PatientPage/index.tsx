import { useEffect, useState } from "react";
import axios from "axios";
import { apiBaseUrl } from "../../constants";

import { Diagnosis, Patient } from "../../types";
import { useParams } from "react-router-dom";
import EntryDetails from "./EntryDetails";
import AddEntryModal from "../AddEntryModal";
import { Button } from "@mui/material";

interface Props {
  diagnosis: Diagnosis[];
}

const PatientPage = ({ diagnosis }: Props) => {
  const { id } = useParams<{ id: string }>();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async () => {
    console.log("submitting new entry");
  };

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
      <div style={{ marginBottom: 12 }}>
        <h3>Entries:</h3>
        {patientInfo.entries.map((entry) => (
          <div
            key={entry.id}
            style={{
              border: "1px solid black",
              borderRadius: 14,
              padding: 4,
              paddingLeft: 20,
            }}
          >
            <EntryDetails entry={entry} />
          </div>
          /* <div key={entry.id}>
           <p>
             {entry.date} <i>{entry.description}</i>
           </p>
           <ul>
             {entry.diagnosisCodes?.map((code: Diagnosis["code"]) => (
               <li key={code}>
                 {code} -{" "}
                 {diagnosis.length > 0 &&
                   diagnosis.filter((d) => d.code === code)[0].name}
               </li>
             ))}
           </ul>
         </div>
        */
        ))}
      </div>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
    </div>
  );
};

export default PatientPage;
