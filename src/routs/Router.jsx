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
import Payment from "../Pages/Dashboard/Payment/Payment";
import CancelPayment from "../Pages/Dashboard/CancelPayment/CancelPayment";
import SuccessPayment from "../Pages/Dashboard/SuccessPayment/SuccessPayment";
import MyPayment from "../Pages/Dashboard/MyPayment/MyPayment";
import PendingRider from "../Pages/Dashboard/PendingRider/PendingRider";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";

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
        loader: () => fetch("/serviceCenters.json"),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivetRouter>
        <Dashboard></Dashboard>
      </PrivetRouter>
    ),
    children: [
      {
        path: "myParcels",
        Component: MyParcels,
      },
      {
        path: "myPayment",
        Component: MyPayment,
      },
      {
        path: "payment/:parcelID",
        Component: Payment,
      },
      {
        path: "/dashboard/paymentSuccess",
        Component: SuccessPayment,
      },
      {
        path: "/dashboard/paymentCancel",
        Component: CancelPayment,
      },
      {
        path: "/dashboard/pendingRider",
        Component: PendingRider,
      },
      {
        path: "/dashboard/manageUsers",
        Component: ManageUsers,
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
