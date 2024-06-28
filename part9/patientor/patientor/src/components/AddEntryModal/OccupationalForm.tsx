import { useState, SyntheticEvent } from "react";

import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
  OutlinedInput,
} from "@mui/material";

import {
  NewOccupationalHealthcareEntryFormValues,
  Diagnosis,
} from "../../types";

interface Props {
  diagnosis: Diagnosis[];
  onCancel: () => void;
  onSubmit: (values: NewOccupationalHealthcareEntryFormValues) => void;
}

const OccupationalForm = ({ diagnosis, onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagCodes, setDiagCodes] = useState<Array<Diagnosis["code"]>>([]);

  const [employerName, setEmployerName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const diagnosisCodeSelect = (event: SelectChangeEvent<string[]>) => {
    event.preventDefault();
    const value = event.target.value;
    console.log(value);

    typeof value === "string"
      ? setDiagCodes(value.split(", "))
      : setDiagCodes(value);
  };

  const addPatient = (event: SyntheticEvent) => {
    event.preventDefault();

    onSubmit(
      (startDate && endDate) || startDate || endDate
        ? {
            type: "OccupationalHealthcare",
            description,
            date,
            specialist,
            diagnosisCodes: diagCodes,
            employerName,
            sickLeave: {
              startDate,
              endDate,
            },
          }
        : {
            type: "OccupationalHealthcare",
            description,
            date,
            specialist,
            diagnosisCodes: diagCodes,
            employerName,
          }
    );
  };

  return (
    <div>
      <form onSubmit={addPatient}>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />

        <InputLabel style={{ marginTop: 20 }}>Date</InputLabel>
        <input
          placeholder="YYYY-MM-DD"
          type="date"
          value={date}
          onChange={({ target }) => setDate(target.value)}
          style={{ padding: 10, marginBottom: 20 }}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
          style={{ marginBottom: 20 }}
        />

        <TextField
          label="Employer name"
          fullWidth
          value={employerName}
          onChange={({ target }) => setEmployerName(target.value)}
        />

        <div style={{ display: "flex", width: "100%", flexDirection: "row" }}>
          <div style={{ flex: 1 }}>
            <InputLabel style={{ marginTop: 20 }}>Start date</InputLabel>
            <input
              placeholder="YYYY-MM-DD"
              type="date"
              value={startDate}
              onChange={({ target }) => setStartDate(target.value)}
              style={{ padding: 10, marginBottom: 20 }}
            />
          </div>

          <div style={{ flex: 1 }}>
            <InputLabel style={{ marginTop: 20 }}>End date</InputLabel>
            <input
              placeholder="YYYY-MM-DD"
              type="date"
              value={endDate}
              onChange={({ target }) => setEndDate(target.value)}
              style={{ padding: 10, marginBottom: 20 }}
            />
          </div>
        </div>

        <InputLabel style={{ marginTop: 20 }}>Diagnosis codes</InputLabel>
        <Select
          label="Diagnosis codes"
          multiple
          fullWidth
          value={diagCodes}
          onChange={diagnosisCodeSelect}
          input={<OutlinedInput label="Multiple Select" />}
        >
          {diagnosis.map((d) => (
            <MenuItem key={d.code} value={d.code}>
              {d.code} {d.name}
            </MenuItem>
          ))}
        </Select>

        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default OccupationalForm;
