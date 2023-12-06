import { Navigate, createBrowserRouter } from "react-router-dom";
import { PlanetsPage } from ".";

export const router = createBrowserRouter([
  {
    path: "/planets/:pageNumber",
    element: <PlanetsPage />,
  },
  {
    path: "*",
    element: <Navigate to="/planets/1" />,
  },
]);
