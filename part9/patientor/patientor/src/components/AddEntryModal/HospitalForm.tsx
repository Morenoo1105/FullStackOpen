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

import { Diagnosis, NewHospitalEntryFormValues } from "../../types";

interface Props {
  diagnosis: Diagnosis[];
  onCancel: () => void;
  onSubmit: (values: NewHospitalEntryFormValues) => void;
}

const HospitalForm = ({ diagnosis, onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagCodes, setDiagCodes] = useState<Array<Diagnosis["code"]>>([]);
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

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

    onSubmit({
      type: "Hospital",
      description,
      date,
      specialist,
      diagnosisCodes: diagCodes,
      discharge: {
        date: dischargeDate,
        criteria: dischargeCriteria,
      },
    });
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
        />

        <InputLabel style={{ marginTop: 20 }}>Discharge date</InputLabel>
        <input
          placeholder="YYYY-MM-DD"
          type="date"
          value={dischargeDate}
          onChange={({ target }) => setDischargeDate(target.value)}
          style={{ padding: 10, marginBottom: 20 }}
        />
        <TextField
          label="Discharge criteria"
          fullWidth
          value={dischargeCriteria}
          onChange={({ target }) => setDischargeCriteria(target.value)}
        />

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

export default HospitalForm;
