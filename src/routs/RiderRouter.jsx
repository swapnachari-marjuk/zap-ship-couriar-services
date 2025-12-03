import React from "react";
import { useAuth } from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const RiderRouter = ({ children }) => {
  const { loading } = useAuth();
  const { userRole, isLoading } = useRole();
  // console.log(userRole);
  if (loading || isLoading) {
    return <p>loading...</p>;
  }
  if (userRole.role !== "rider") {
    return (
      <div>
        <p className="text-3xl text-red-500 font-bold">
          You are not allowed for this page.
        </p>
      </div>
    );
  }
  return children;
};

export default RiderRouter;
