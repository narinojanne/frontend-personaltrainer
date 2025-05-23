import { ChangeEvent, useState } from "react";
import { EditCustomerProps } from "../types/Types";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

// Function to show edit customer form
export default function EditCustomer({
  currentCustomer,
  editCustomer,
  onCustomerEdited,
}: EditCustomerProps) {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState({
    id: currentCustomer.id,
    firstname: currentCustomer.firstname,
    lastname: currentCustomer.lastname,
    email: currentCustomer.email,
    phone: currentCustomer.phone,
    streetaddress: currentCustomer.streetaddress,
    postcode: currentCustomer.postcode,
    city: currentCustomer.city,
    _links: currentCustomer._links,
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

  // Edit current customer when form submit
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await editCustomer(customer, customer._links.self.href);
      onCustomerEdited(); // reload customerlistaggrid
      handleClose();
    } catch (err) {
      console.error("Customer edit failed", err);
    }
  };

  // Customer data form
  return (
    <div>
      <Button size="small" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Edit Customer</DialogTitle>
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
            <Button type="submit">Update</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
