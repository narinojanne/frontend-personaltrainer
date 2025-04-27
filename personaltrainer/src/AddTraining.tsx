import { ChangeEvent, useState } from "react";
import { AddTrainingProps, NewTraining } from "./Types";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Dayjs } from "dayjs";

// Function to add new training
export default function AddTraining({
  currentCustomer,
  addTraining,
}: AddTrainingProps) {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [training, setTraining] = useState({
    // date: "",
    activity: "",
    duration: "",
    // customer: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTraining({ ...training, [event.target.name]: event.target.value });
  };

  // Training data form
  return (
    <div>
      <Button size="small" onClick={handleClickOpen}>
        Add Training
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: "form",
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              if (!selectedDate) return;

              const newTraining: NewTraining = {
                ...training,
                date: selectedDate.toISOString(),
                customer: currentCustomer._links.self.href,
              };

              addTraining(newTraining);
              handleClose();
            },
          },
        }}>
        <DialogTitle>New Training</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Pick date and time"
              ampm={false}
              disablePast
              value={selectedDate}
              onChange={(value) => setSelectedDate(value)}
            />
          </LocalizationProvider>
          <TextField
            required
            margin="dense"
            id="activity"
            name="activity"
            type="text"
            value={training.activity}
            onChange={handleInputChange}
            label="Activity"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="duration"
            name="duration"
            type="text"
            value={training.duration}
            onChange={handleInputChange}
            label="Duration"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Customer"
            value={currentCustomer._links.self.href}
            fullWidth
            variant="standard"
            slotProps={{ input: { readOnly: true } }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
