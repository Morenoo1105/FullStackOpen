import {
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Alert,
} from "@mui/material";

import HealthCheckForm from "./HealthCheckForm";
import { Diagnosis, Entry, NewEntryFormValues } from "../../types";
import HospitalForm from "./HospitalForm";
import OccupationalForm from "./OccupationalForm";

interface Props {
  diagnosis: Diagnosis[];
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: NewEntryFormValues) => void;
  error?: string;
  type: Entry["type"];
}

const AddEntryModal = ({
  diagnosis,
  modalOpen,
  onClose,
  onSubmit,
  error,
  type,
}: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>
      Add a new{" "}
      {type === "HealthCheck"
        ? "Health Check"
        : type === "Hospital"
        ? "Hospital"
        : "Occupational Healthcare"}{" "}
      entry
    </DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{error}</Alert>}
      {type === "HealthCheck" && (
        <HealthCheckForm
          diagnosis={diagnosis}
          onSubmit={onSubmit}
          onCancel={onClose}
        />
      )}
      {type === "Hospital" && (
        <HospitalForm
          diagnosis={diagnosis}
          onSubmit={onSubmit}
          onCancel={onClose}
        />
      )}
      {type === "OccupationalHealthcare" && (
        <OccupationalForm
          diagnosis={diagnosis}
          onSubmit={onSubmit}
          onCancel={onClose}
        />
      )}
    </DialogContent>
  </Dialog>
);

export default AddEntryModal;
