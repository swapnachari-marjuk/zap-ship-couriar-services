import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout/RootLayout";
import Home from "../Pages/Home/Home/Home";
import Map from "../Pages/Map/Map";
import AuthLayout from "../Layouts/AuthLayout/AuthLayout";
import Register from "../Pages/Auth/Register/Register";
import Login from "../Pages/Auth/Login/Login";
import PrivetRouter from "./PrivetRouter";
import Rider from "../Pages/Rider/Rider";
import SendParcel from "../Pages/SendParcel/SendParcel";
import Dashboard from "../Layouts/DashboardLayOut/Dashboard";
import MyParcels from "../Pages/Dashboard/MyParcels/MyParcels";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/coverage",
        Component: Map,
        loader: () => fetch("/serviceCenters.json"),
      },
      {
        path: "/sendParcel",
        element: (
          <PrivetRouter>
            <SendParcel />
          </PrivetRouter>
        ),
        loader: () => fetch("/serviceCenters.json"),
      },
      {
        path: "/rider",
        element: (
          <PrivetRouter>
            <Rider />
          </PrivetRouter>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivetRouter>
        <Dashboard></Dashboard>
      </PrivetRouter>
    ),
    children: [
      {
        path: "/dashboard/myParcels",
        Component: MyParcels,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/login",
        Component: Login,
      },
    ],
  },
]);

export default router;
