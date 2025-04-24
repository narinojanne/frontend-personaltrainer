import { ChangeEvent, useState } from "react";
import { AddCustomerProps } from "./Types";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

// Function to add new customer
export default function AddCustomer({ addCustomer }: AddCustomerProps) {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    streetaddress: "",
    postcode: "",
    city: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
  };

  // Customer data form
  return (
    <div>
      <Button
        style={{ margin: 10 }}
        variant="outlined"
        onClick={handleClickOpen}>
        Add Customer
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: "form",
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              addCustomer(customer);
              handleClose();
            },
          },
        }}>
        <DialogTitle>New Customer</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="firstname"
            name="firstname"
            type="text"
            value={customer.firstname}
            onChange={handleInputChange}
            label="First name"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="lastname"
            name="lastname"
            type="text"
            value={customer.lastname}
            onChange={handleInputChange}
            label="Last name"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="email"
            name="email"
            type="email"
            value={customer.email}
            onChange={handleInputChange}
            label="Email"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="phone"
            name="phone"
            type="text"
            value={customer.phone}
            onChange={handleInputChange}
            label="Phone"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="streetaddress"
            name="streetaddress"
            type="text"
            value={customer.streetaddress}
            onChange={handleInputChange}
            label="Street address"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="postcode"
            name="postcode"
            type="text"
            value={customer.postcode}
            onChange={handleInputChange}
            label="Postcode"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="city"
            name="city"
            type="text"
            value={customer.city}
            onChange={handleInputChange}
            label="City"
            fullWidth
            variant="standard"
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
