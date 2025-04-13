import { useEffect, useState } from "react";
import { Training } from "./Types";
import { DataGrid, GridColDef, GridValueGetter } from "@mui/x-data-grid";
import { Paper } from "@mui/material";
import dayjs from "dayjs";

const BASE_URL =
  "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api";

// Function to get and display trainings data
export default function TrainingList() {
  const [trainings, setTrainings] = useState<Training[]>([]);

  // Defining the columns of data grid
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "date",
      headerName: "Date",
      width: 200,
      valueFormatter: (value: string) => {
        return dayjs(value).format("DD:MM:YYYY HH:mm");
      },
    },
    { field: "activity", headerName: "Activity", width: 130 },
    {
      field: "duration",
      headerName: "Duration (mins)",
      align: "center",
      width: 130,
    },
    {
      field: "lastname",
      headerName: "Last name",
      width: 130,
    },
  ];

  // Initializing data grid pagesize (10 rows in a page)
  const paginationModel = { page: 0, pageSize: 10 };

  // Get data from DB
  const fetchTrainings = () => {
    fetch(`${BASE_URL}/trainings`)
      .then((response) => response.json())
      .then((data) => {
        const trainingsWID: Training[] = data._embedded.trainings.map(
          (training: Training) => {
            const id: String = training._links.self.href.split("/").pop() || "";
            return {
              ...training,
              id,
            };
          }
        );
        setTrainings(trainingsWID);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => fetchTrainings(), []);

  // Display data in data grid
  return (
    <Paper sx={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={trainings}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10, 15, 20, 25]}
      />
    </Paper>
  );
}
