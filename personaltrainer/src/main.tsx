import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createHashRouter, RouterProvider } from "react-router";
import Home from "./Home.tsx";
import Error from "./Error.tsx";
import TrainingListAgGrid from "./TrainingListAgGrid.tsx";
import CustomerListAgGrid from "./CustomerListAgGrid.tsx";
import TrainingsCalendar from "./TrainingsCalendar.tsx";
import CustomerChart from "./CustomerChart.tsx";
import CustomersTrainings from "./CustomersTrainings.tsx";

const router = createHashRouter(
  [
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
  ]
  /* {
    basename: import.meta.env.DEV ? "/" : import.meta.env.BASE_URL,
  } */
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
