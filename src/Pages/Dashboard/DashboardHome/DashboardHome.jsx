import React from "react";
import useRole from "../../../hooks/useRole";
import AdminDashboard from "./AdminDashboard";
import RiderDashboard from "./RiderDashboard";
import UserDashboard from "./UserDashboard";

const DashboardHome = () => {
  const { userRole, isLoading } = useRole();
  const { role } = userRole;
  if (isLoading) {
    return <p>loading...</p>
  }
  if (role === "admin") {
    return <AdminDashboard />;
  } else if (role === "rider") {
    return <RiderDashboard />;
  } else if (role === "user") {
    return <UserDashboard />;
  }
};

export default DashboardHome;
