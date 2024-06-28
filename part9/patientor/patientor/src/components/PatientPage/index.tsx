import { useEffect, useState } from "react";
import axios from "axios";
import { apiBaseUrl } from "../../constants";

import { Diagnosis, Entry, EntryWithoutId, Patient } from "../../types";
import { useParams } from "react-router-dom";
import EntryDetails from "./EntryDetails";
import AddEntryModal from "../AddEntryModal";
import { Button } from "@mui/material";
import patientService from "../../services/patients";

interface Props {
  diagnosis: Diagnosis[];
}

const PatientPage = ({ diagnosis }: Props) => {
  const { id } = useParams<{ id: string }>();
  const [patientInfo, setPatientInfo] = useState<Patient>();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [openingModal, setOpeningModal] =
    useState<Entry["type"]>("HealthCheck");

  const openModal = (opening: Entry["type"]): void => {
    setModalOpen(true);
    setOpeningModal(opening);
  };

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (value: EntryWithoutId) => {
    try {
      if (patientInfo) {
        const entry = await patientService.addEntry(patientInfo.id, value);
        setPatientInfo({
          ...patientInfo,
          entries: patientInfo.entries.concat(entry),
        });
        setModalOpen(false);
      }
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }

    console.log("submitting new entry");
  };

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
        diagnosis={diagnosis}
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
        type={openingModal}
      />
      <div style={{ display: "flex", gap: 12 }}>
        <Button variant="contained" onClick={() => openModal("HealthCheck")}>
          + Health Check
        </Button>
        <Button variant="contained" onClick={() => openModal("Hospital")}>
          + Hospital
        </Button>
        <Button
          variant="contained"
          onClick={() => openModal("OccupationalHealthcare")}
        >
          + Occupational Healthcare
        </Button>
      </div>
    </div>
  );
};

export default PatientPage;
