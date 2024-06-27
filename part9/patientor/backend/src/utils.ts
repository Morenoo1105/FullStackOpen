import {
  DiagnoseEntry,
  Discharge,
  EntryWithoutId,
  Gender,
  HealthCheckRating,
  NewBaseEntry,
  NewPatientEntry,
  SickLeave,
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseString = (value: unknown): string => {
  if (!value || !isString(value)) {
    throw new Error(`Incorrect or missing fields`);
  }
  return value;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing fields");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newEntry: NewPatientEntry = {
      name: parseString(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseString(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation),
      entries: [],
    };

    return newEntry;
  }

  throw new Error("Incorrect data: some fields are missing");
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error("Incorrect or missing specialist");
  }
  return specialist;
};

const parseDiagnosisCodes = (object: unknown): Array<DiagnoseEntry["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<DiagnoseEntry["code"]>;
  }

  return object.diagnosisCodes as Array<DiagnoseEntry["code"]>;
};

const isNumber = (text: unknown): text is number => {
  return typeof text === "number" || text instanceof Number;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (
    !healthCheckRating ||
    !isNumber(healthCheckRating) ||
    !isHealthCheckRating(healthCheckRating)
  ) {
    throw new Error(
      "Incorrect or missing healthCheckRating: " + healthCheckRating
    );
  }
  return healthCheckRating;
};

const parseSickLeave = (object: unknown): SickLeave => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if ("startDate" in object && "endDate" in object) {
    const sickLeave: SickLeave = {
      startDate: parseDate(object.startDate),
      endDate: parseDate(object.endDate),
    };
    return sickLeave;
  }
  throw new Error("Incorrect data: a field missing");
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error("Incorrect ot missing description");
  }
  return employerName;
};

const parseCriteria = (criteria: unknown): string => {
  if (!criteria || !isString(criteria)) {
    throw new Error("Incorrect or missing criteria");
  }
  return criteria;
};

const parseDischarge = (object: unknown): Discharge => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if ("date" in object && "criteria" in object) {
    const discharge: Discharge = {
      date: parseDate(object.date),
      criteria: parseCriteria(object.criteria),
    };
    return discharge;
  }
  throw new Error("Incorrect data: a field missing");
};

const toNewDiagnoseEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing fields");
  }

  if ("description" in object && "date" in object && "specialist" in object) {
    const newBaseEntry: NewBaseEntry =
      "diagnosisCodes" in object
        ? {
            description: parseString(object.description),
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object),
          }
        : {
            description: parseString(object.description),
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
          };

    if ("type" in object) {
      switch (object.type) {
        case "HealthCheck":
          if ("healthCheckRating" in object) {
            const healthCheckEntry: EntryWithoutId = {
              ...newBaseEntry,
              type: "HealthCheck",
              healthCheckRating: parseHealthCheckRating(
                object.healthCheckRating
              ),
            };
            return healthCheckEntry;
          }
          throw new Error("Incorrect data: health check rating field missing");
        case "Hospital":
          if ("discharge" in object) {
            const hospitalEntry: EntryWithoutId = {
              ...newBaseEntry,
              type: "Hospital",
              discharge: parseDischarge(object.discharge),
            };
            return hospitalEntry;
          }
          throw new Error("Incorrect data: discharge field missing");
        case "OccupationalHealthcare":
          if ("employerName" in object) {
            const occupationalHealthcareEntry: EntryWithoutId =
              "sickLeave" in object
                ? {
                    ...newBaseEntry,
                    type: "OccupationalHealthcare",
                    employerName: parseEmployerName(object.employerName),

                    sickLeave: parseSickLeave(object),
                  }
                : {
                    ...newBaseEntry,
                    type: "OccupationalHealthcare",
                    employerName: parseEmployerName(object.employerName),
                  };
            return occupationalHealthcareEntry;
          }
          throw new Error("Incorrect data: employer name field missing");
      }
    }
  }

  throw new Error("Incorrect data: some fields are missing");
};

export { toNewPatientEntry, toNewDiagnoseEntry };
