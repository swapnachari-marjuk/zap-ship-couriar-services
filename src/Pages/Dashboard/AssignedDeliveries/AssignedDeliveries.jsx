import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useAuth } from "../../../hooks/useAuth";

import { FaCheck, FaX } from "react-icons/fa6";
import Swal from "sweetalert2";

const AssignedDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: parcels, refetch } = useQuery({
    queryKey: ["parcels", user.email, "Assigned_Rider"],
    queryFn: async () => {
      const res = await axiosSecure(
        `/parcels/rider?riderEmail=${user.email}&deliveryStatus=Assigned_Rider`
      );
      return res.data;
    },
  });

  const handleAccept = (parcel, status) => {
    const updateInfo = { deliveryStatus: status };

    axiosSecure
      .patch(`/parcel/${parcel._id}/status`, updateInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          Swal.fire({
            icon: "success",
            title: "",
            text: `Parcel delivery status was updated with ${status
              .split("_")
              .join(" ")}`,
            timer: 1500,
            toast: true,
            showConfirmButton: false,
          });
          refetch();
        }
      });
  };
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th>Sl.</th>
            <th>Name</th>
            <th>Delivery Charge</th>
            <th>Sender District</th>
            <th>Requested At</th>
            <th>Accept</th>
            <th>Pick Up</th>
          </tr>
        </thead>
        <tbody>
          {parcels?.map((parcel, index) => (
            <tr key={parcel._id}>
              <th>{index + 1}</th>
              <td>{parcel?.parcelName}</td>
              <td>{parcel?.courierCost}</td>
              <td>{parcel?.senderDistrict}</td>
              <td>{new Date(parcel?.requestedAt).toLocaleString("en-GB")}</td>
              {parcel.deliveryStatus === "Assigned_Rider" ? (
                <td>
                  <button
                    className="btn btn-sm"
                    onClick={() => handleAccept(parcel, "rider_arriving")}
                  >
                    <FaCheck />
                  </button>
                  <button className="btn btn-sm">
                    <FaX />
                  </button>
                </td>
              ) : (
                <td>
                  <span className="badge badge-primary">Accepted</span>
                </td>
              )}

              {parcel.deliveryStatus === "Assigned_Rider" ? (
                <td>
                  <span className="font-bold text-red-500">
                    Accept Request At first
                  </span>
                </td>
              ) : (
                <td>
                  {parcel.deliveryStatus === "picked_up" ? (
                    <span className="badge badge-warning mr-4">Picked Up</span>
                  ) : (
                    <button
                      className="btn btn-sm btn-primary mr-4"
                      onClick={() => handleAccept(parcel, "picked_up")}
                    >
                      Mark As Picked Up
                    </button>
                  )}
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleAccept(parcel, "delivered")}
                  >
                    Mark As Delivered
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssignedDeliveries;
