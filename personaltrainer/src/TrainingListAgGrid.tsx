import { useEffect, useMemo, useState } from "react";
import { Training } from "./Types";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ColDef } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import dayjs from "dayjs";
ModuleRegistry.registerModules([AllCommunityModule]);

// Setting base url
const BASE_URL =
  "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api";

// Function to get and display trinings data
export default function TrainingListAgGrid() {
  const [trainings, setTrainings] = useState<Training[]>([]);
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
  const [columnDefs] = useState<ColDef<Training>[]>([
    { field: "id" },
    {
      field: "date",
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
  ]);

  // Get trainings data
  useEffect(() => {
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

    fetchTrainings();
  }, []);

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
        rowData={trainings}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSizeSelector={[5, 10, 15, 20, 50, 100]}
        paginationPageSize={20}
      />
    </div>
  );
}
