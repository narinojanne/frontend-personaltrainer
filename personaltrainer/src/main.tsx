import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./Home.tsx";
import Error from "./Error.tsx";
import TrainingListAgGrid from "./TrainingListAgGrid.tsx";
import CustomerListAgGrid from "./CustomerListAgGrid.tsx";
import TrainingsCalendar from "./TrainingsCalendar.tsx";

const router = createBrowserRouter([
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
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
