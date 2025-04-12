import { useEffect, useState } from "react";
import { Customer } from "./Types";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

const BASE_URL =
  "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api";

// Function to get and display customers data
export default function CustomerList() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  // Defining the columns of data grid
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstname", headerName: "First name", width: 130 },
    { field: "lastname", headerName: "Last name", width: 130 },
    { field: "city", headerName: "City", width: 130 },
    { field: "phone", headerName: "Phonenumber", width: 130 },
    { field: "email", headerName: "Email", width: 130 },
  ];

  // Initializing data grid pagesize (10 rows in a page)
  const paginationModel = { page: 0, pageSize: 10 };

  // Get data from DB
  const fetchCustomers = () => {
    fetch(`${BASE_URL}/customers`)
      .then((response) => response.json())
      .then((data) => {
        const customerWID: Customer[] = data._embedded.customers.map(
          (customer: Customer) => {
            const id: String = customer._links.self.href.split("/").pop() || "";
            return {
              ...customer,
              id,
            };
          }
        );
        setCustomers(customerWID);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => fetchCustomers(), []);

  // Display data in data grid
  return (
    <Paper sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <DataGrid
        rows={customers}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10, 15, 20, 25]}
      />
    </Paper>
  );
}
