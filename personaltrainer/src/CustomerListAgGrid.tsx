import { useEffect, useMemo, useState } from "react";
import { Customer } from "./Types";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import Button from "@mui/material/Button";
ModuleRegistry.registerModules([AllCommunityModule]);

// Setting base url
const BASE_URL =
  "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api";

// Function to get and display customers data
export default function CustomerListAgGrid() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Set some default rules to columns
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      resizable: true,
      filter: true,
      floatingFilter: true,
      minWidth: 50,
      wrapText: true,
      autoHeight: true,
    };
  }, []);

  // Initializing columns
  const [columnDefs] = useState<ColDef<Customer>[]>([
    { field: "id" },
    { field: "firstname", cellStyle: { textAlign: "start" } },
    { field: "lastname", cellStyle: { textAlign: "start" } },
    { field: "city", cellStyle: { textAlign: "start" } },
    { field: "phone", cellStyle: { textAlign: "start" } },
    { field: "email", cellStyle: { textAlign: "start" } },
    {
      sortable: false,
      filter: false,
      flex: 0.5,
      field: "_links.self.href",
      headerName: "",
      cellRenderer: (params: ICellRendererParams) => (
        <Button
          color="secondary"
          size="small"
          onClick={() => handleDelete(params.value)}>
          DELETE
        </Button>
      ),
    },
  ]);

  // Get customer data and add customer id to data

  const fetchCustomers = async () => {
    try {
      const response = await fetch(`${BASE_URL}/customers`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
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
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDelete = (url: string) => {
    if (window.confirm("Are you sure you want to delete car?")) {
      deleteCustomer(url);
    }
  };

  const deleteCustomer = (url: string) => {
    const options = {
      method: "DELETE",
    };

    fetch(url, options)
      .then(() => fetchCustomers())
      .catch((err) => console.error(err));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Display data
  return (
    <div
      style={{
        maxWidth: "100%",
        height: "65vh",
        margin: "auto",
      }}>
      <AgGridReact
        defaultColDef={defaultColDef}
        rowData={customers}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSizeSelector={[5, 10, 15, 20, 50, 100]}
        paginationPageSize={20}
      />
    </div>
  );
}
