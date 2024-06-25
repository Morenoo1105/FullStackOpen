import { v1 as uuid } from "uuid";
import patientData from "../../data/patients";
import {
  NewPatientEntry,
  NonSenitivePatientEntry,
  PatientEntry,
} from "../types";
import patientEntries from "../../data/patients";

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

const addPatient = (patient: NewPatientEntry) => {
  const id = uuid();

  const newPatient = {
    id,
    ...patient,
  };

  patientEntries.push(newPatient);

  return newPatient;
};

export default { getEntries, getNonSensitiveEntries, addPatient };
