import { v1 as uuid } from "uuid";
import patientData from "../../data/patients";
import {
  EntryWithoutId,
  NewPatientEntry,
  NonSensitivePatientEntry,
  PatientEntry,
} from "../types";
import patientEntries from "../../data/patients";

const getEntries = (): PatientEntry[] => {
  return patientData;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatient = (id: string): PatientEntry | undefined => {
  return patientData.find((patient) => patient.id === id);
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

const addEntry = (entry: EntryWithoutId, patient: PatientEntry) => {
  const id = uuid();

  const newEntry = {
    id,
    ...entry,
  };

  patient.entries.push(newEntry);

  return newEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  getPatient,
  addPatient,
  addEntry,
};
