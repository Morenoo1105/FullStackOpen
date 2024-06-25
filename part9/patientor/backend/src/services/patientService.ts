import patientData from "../../data/patients";
import { NonSenitivePatientEntry, PatientEntry } from "../types";

const getEntries = (): PatientEntry[] => {
  return patientData;
};

const getNonSensitiveEntries = (): NonSenitivePatientEntry[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};
export default { getEntries, getNonSensitiveEntries };
