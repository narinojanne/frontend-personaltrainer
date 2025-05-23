import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { Customer, NewCustomer } from "../types/Types";
import {
  addCustomer,
  addTraining,
  deleteCustomer,
  editCustomer,
} from "../functions/Functions";

import { AgGridReact } from "ag-grid-react";
import { AgGridReact as AgGridReactType } from "ag-grid-react/";
import "ag-grid-community/styles/ag-theme-quartz.css";
import {
  AllCommunityModule,
  ModuleRegistry,
  ColDef,
  ICellRendererParams,
  CsvExportModule,
} from "ag-grid-community";
import Button from "@mui/material/Button";
import AddCustomer from "../components/AddCustomer";
import EditCustomer from "../components/EditCustomer";
import AddTraining from "../components/AddTraining";
import { Container, Stack } from "@mui/material";
import { Link } from "react-router";
ModuleRegistry.registerModules([AllCommunityModule, CsvExportModule]);

// Setting base url
const BASE_URL =
  "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api";

// Function to get and display customers data
export default function CustomerListAgGrid() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const gridRef = useRef<AgGridReactType<Customer>>(null);

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
    { field: "id", flex: 0.5 },
    { field: "firstname", cellStyle: { textAlign: "start" }, flex: 0.8 },
    {
      field: "lastname",
      sort: "asc",
      cellStyle: { textAlign: "start" },
      flex: 0.8,
    },
    {
      field: "streetaddress",
      cellStyle: { textAlign: "start" },
      flex: 0.8,
      hide: true,
    },
    { field: "city", cellStyle: { textAlign: "start" }, flex: 0.8 },
    { field: "phone", cellStyle: { textAlign: "start" }, flex: 0.8 },
    { field: "email", cellStyle: { textAlign: "start" } },
    {
      sortable: false,
      filter: false,
      flex: 0.7,
      headerName: "",
      cellRenderer: (params: any) => {
        const customerId = params.data.id;

        return (
          <Button component={Link} to={`/customerchart/${customerId}`}>
            Training Chart
          </Button>
        );
      },
    },
    {
      sortable: false,
      filter: false,
      flex: 0.75,
      headerName: "",
      cellRenderer: (params: any) => {
        const customerId = params.data.id;
        return (
          <Button component={Link} to={`/customerstrainings/${customerId}`}>
            View Trainings
          </Button>
        );
      },
    },
    {
      sortable: false,
      filter: false,
      flex: 0.7,
      headerName: "",
      cellRenderer: (params: ICellRendererParams<Customer>) => (
        <AddTraining
          currentCustomer={params.data as Customer}
          addTraining={addTraining}
        />
      ),
    },
    {
      sortable: false,
      filter: false,
      flex: 0.5,
      field: "_links.self.href",
      headerName: "",
      cellRenderer: (params: ICellRendererParams<Customer>) => (
        <EditCustomer
          currentCustomer={params.data as Customer}
          editCustomer={editCustomer}
          onCustomerEdited={fetchCustomers}
        />
      ),
    },
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
          onClick={() =>
            handleDelete(
              params.data._links.self.href
              //params.data.id.toString()
            )
          }>
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

  // Confirm delete
  const handleDelete = async (url: string) => {
    if (window.confirm("Are you sure you want to delete customer?")) {
      try {
        await deleteCustomer(url);
        await fetchCustomers();
      } catch (err) {
        console.error("Failed to delete customer", err);
      }
    }
  };

  // Create new customer when form submit and reload data
  const handleAddCustomer = async (customer: NewCustomer) => {
    try {
      await addCustomer(customer);
      fetchCustomers(); // reload customerlistaggrid
    } catch (err) {
      console.error("Create customer failed", err);
    }
  };

  // Function to export customer data to CSV
  const onBtnExport = useCallback(() => {
    const params = {
      columnKeys: [
        "id",
        "firstname",
        "lastname",
        "streetaddress",
        "city",
        "phone",
        "email",
      ],
    };
    gridRef.current?.api.exportDataAsCsv(params);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Display data
  return (
    <Container
      style={{
        maxWidth: "100%",
        height: "65vh",
        margin: "auto",
        padding: 0,
      }}>
      <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 1 }}>
        <AddCustomer addCustomer={handleAddCustomer} />
        <Button style={{ margin: 10 }} variant="outlined" onClick={onBtnExport}>
          Download CSV export file
        </Button>
      </Stack>
      <AgGridReact
        ref={gridRef}
        defaultColDef={defaultColDef}
        rowData={customers}
        columnDefs={columnDefs}
        domLayout="autoHeight"
        getRowId={(params) => params.data.id.toString()}
        pagination={true}
        paginationPageSizeSelector={[5, 10, 15, 20, 50, 100]}
        paginationPageSize={15}
      />
    </Container>
  );
}
