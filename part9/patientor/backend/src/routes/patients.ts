import express from "express";
import patientService from "../services/patientService";
import { toNewDiagnoseEntry, toNewPatientEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get("/:id", (req, res) => {
  const patient = patientService.getPatient(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send("Something went wrong. Error: " + error.message);
    }
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    const patient = patientService.getPatient(req.params.id);

    if (patient) {
      const newEntry = toNewDiagnoseEntry(req.body);
      const addedEntry = patientService.addEntry(newEntry, patient);
      res.json(addedEntry);
    } else {
      res.sendStatus(404);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send("Something went wrong. Error: " + error.message);
    }
  }
});

export default router;
