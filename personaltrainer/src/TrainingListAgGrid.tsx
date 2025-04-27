import { useEffect, useMemo, useState, useRef } from "react";
import { Training } from "./Types";

import { AgGridReact } from "ag-grid-react";
import { AgGridReact as AgGridReactType } from "ag-grid-react/";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
ModuleRegistry.registerModules([AllCommunityModule]);

// Setting base url
const BASE_URL =
  "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api";

// Function to get and display trinings data
export default function TrainingListAgGrid() {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const gridRef = useRef<AgGridReactType<Training>>(null);

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
  const [columnDefs] = useState<ColDef<Training>[]>([
    { field: "id", flex: 0.3 },
    {
      field: "date",
      sort: "asc",
      cellStyle: { textAlign: "start" },
      valueFormatter: (params) => {
        return dayjs(params.value).format("DD.MM.YYYY HH:mm");
      },
    },
    {
      field: "activity",
      cellStyle: { textAlign: "start" },
    },
    {
      field: "duration",
      flex: 0.4,
    },
    {
      field: "customer.lastname",
      headerName: "Customer name",
      cellStyle: { textAlign: "start" },
      valueGetter: (params: Training | any) => {
        return (
          params.data.customer?.lastname + " " + params.data.customer?.firstname
        );
      },
    },
    {
      sortable: false,
      filter: false,
      flex: 0.5,
      headerName: "",
      cellRenderer: (params: ICellRendererParams) => (
        <Button
          color="secondary"
          size="small"
          onClick={() => handleDelete(params.data.id)}>
          DELETE
        </Button>
      ),
    },
  ]);

  // Get trainings data
  const fetchTrainings = async () => {
    try {
      const response = await fetch(`${BASE_URL}/gettrainings`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTrainings(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainings();
  }, []);

  // Confirm delete
  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete training?")) {
      deleteTraining(id);
    }
  };

  // Function to delete training
  const deleteTraining = async (id: number) => {
    try {
      const response = await fetch(`${BASE_URL}/trainings/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Delete failed");

      const api = gridRef.current?.api;
      const rowNodeToRemove = api?.getRowNode(id.toString());

      if (api && rowNodeToRemove && rowNodeToRemove.data) {
        api.applyTransaction({ remove: [rowNodeToRemove.data] });
      }
    } catch (err) {
      console.error(err);
    }
  };

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
      {/* <AddTraining addTraining={addTraining} /> */}
      <AgGridReact
        ref={gridRef}
        defaultColDef={defaultColDef}
        rowData={trainings}
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
