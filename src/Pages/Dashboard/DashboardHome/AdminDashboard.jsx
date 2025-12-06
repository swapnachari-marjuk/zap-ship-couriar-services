import React from "react";
import useAxios from "../../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

const AdminDashboard = () => {
  const axiosInstance = useAxios();
  const { data: parcelsData = [] } = useQuery({
    queryKey: ["parcels-by-pipeline"],
    queryFn: async () => {
      const res = await axiosInstance.get("/parcels/byPipeline/forAdmin");
      return res.data;
    },
  });
  return (
    <div className="stats bg-base-100 border-base-300 border">
      {parcelsData.map((data, i) => (
        <div key={i} className="stat">
          <div className="stat-title text-xl font-bold">
            {Object.keys(data)[1]
              .split(/(?=[A-Z])/)
              .join(" ")
              .replace(/\b\w/g, (c) => c.toUpperCase())}
          </div>
          <div className="stat-value">{data.totalParcels}</div>
          <div className="stat-actions">
            <button className="btn btn-xs">{data._id.toUpperCase()}</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
