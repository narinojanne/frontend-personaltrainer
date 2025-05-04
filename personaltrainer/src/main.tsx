import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createHashRouter, RouterProvider } from "react-router";
import Home from "./pages/Home.tsx";
import Error from "./pages/Error.tsx";
import TrainingListAgGrid from "./pages/TrainingListAgGrid.tsx";
import CustomerListAgGrid from "./pages/CustomerListAgGrid.tsx";
import TrainingsCalendar from "./pages/TrainingsCalendar.tsx";
import CustomerChart from "./pages/CustomerChart.tsx";
import CustomersTrainings from "./pages/CustomersTrainings.tsx";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        element: <Home />,
        index: true,
      },
      {
        path: "customerlistaggrid",
        element: <CustomerListAgGrid />,
      },
      {
        path: "traininglistaggrid",
        element: <TrainingListAgGrid />,
      },
      {
        path: "trainingscalendar",
        element: <TrainingsCalendar />,
      },
      {
        path: "customerchart/:id",
        element: <CustomerChart />,
      },
      {
        path: "customerstrainings/:id",
        element: <CustomersTrainings />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
