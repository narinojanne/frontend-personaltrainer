import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { Training } from "../types/Types";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ColDef } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import dayjs from "dayjs";
import { Container } from "@mui/material";
ModuleRegistry.registerModules([AllCommunityModule]);

// Setting base url
const BASE_URL =
  "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api";

// Function to get and show customers trainings
export default function CustomersTrainings() {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const { id } = useParams();

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
  ]);

  // Fetch customers trainings
  useEffect(() => {
    fetch(`${BASE_URL}/customers/${id}/trainings`)
      .then((res) => res.json())
      .then((data) => {
        setTrainings(data._embedded.trainings);
      });
  }, [id]);

  return (
    <Container
      style={{
        maxWidth: "50%",
        height: "65vh",
        margin: "auto",
        padding: 0,
      }}>
      <h2>Customers {id} Trainings</h2>
      <AgGridReact
        defaultColDef={defaultColDef}
        rowData={trainings}
        columnDefs={columnDefs}
        domLayout="autoHeight"
        pagination={true}
        paginationPageSizeSelector={[5, 10, 15, 20, 50, 100]}
        paginationPageSize={15}
      />
    </Container>
  );
}
