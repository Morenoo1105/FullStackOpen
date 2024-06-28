import { useState, SyntheticEvent } from "react";

import {
  TextField,
  Grid,
  Button,
  Slider,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  SelectChangeEvent,
} from "@mui/material";

import {
  Diagnosis,
  HealthCheckRating,
  NewHealthcheckEntryFormValues,
} from "../../types";

interface Props {
  diagnosis: Diagnosis[];
  onCancel: () => void;
  onSubmit: (values: NewHealthcheckEntryFormValues) => void;
}

const HealthCheckForm = ({ diagnosis, onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagCodes, setDiagCodes] = useState<Array<Diagnosis["code"]>>([]);

  const [healthRating, setHealthRating] = useState<HealthCheckRating>(0);

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
      type: "HealthCheck",
      description,
      date,
      specialist,
      healthCheckRating: healthRating,
      diagnosisCodes: diagCodes,
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

        <InputLabel style={{ marginTop: 20 }}>Health Rating</InputLabel>
        <Slider
          defaultValue={0}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          value={healthRating}
          onChange={(_, value) => setHealthRating(value as HealthCheckRating)}
          step={1}
          min={0}
          max={3}
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

export default HealthCheckForm;
