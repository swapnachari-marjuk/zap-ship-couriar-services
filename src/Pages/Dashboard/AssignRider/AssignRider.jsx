import React, { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { IoCloseCircleOutline } from "react-icons/io5";
import Swal from "sweetalert2";

const AssignRider = () => {
  const modalRef = useRef();
  const [selectedParcel, setSelectedParcel] = useState(null);
  const axiosSecure = useAxiosSecure();
  const { data: parcels = [], refetch: parcelsRefetch } = useQuery({
    queryKey: ["parcels", "pending-pickup"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/parcels?deliveryStatus=pending-pickup"
      );
      return res.data;
    },
  });

  const { data: riders } = useQuery({
    queryKey: ["parcel", selectedParcel?.senderDistrict, "available"],
    enabled: !!selectedParcel,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders?status=approved&district=${selectedParcel.senderDistrict}&workStatus=Available`
      );
      return res.data;
    },
  });

  const showModal = (parcel) => {
    setSelectedParcel(parcel);
    modalRef.current.showModal();
  };

  const handleAssignRider = (rider) => {
    const riderAssignInfo = {
      riderId: rider._id,
      riderName: rider.riderName,
      riderEmail: rider.riderEmail,
      parcelId: selectedParcel._id,
    };
    axiosSecure.patch(`/parcels`, riderAssignInfo).then((res) => {
      if (res.data.modifiedCount) {
        parcelsRefetch();
        modalRef.current.close();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Rider assigned for this parcel.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      console.log(res.data);
    });
  };
  return (
    <div>
      <p>Assign Rider: {parcels.length}</p>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Sl.</th>
              <th>Name</th>
              <th>Cost </th>
              <th>Pickup Location</th>
              <th>Created At</th>
              <th>Action</th>
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
                <td>
                  <button
                    onClick={() => showModal(parcel)}
                    className="btn btn-sm btn-ghost"
                  >
                    Assign Rider
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dialog
        ref={modalRef}
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <form className="absolute right-4 top-4 " method="dialog">
            <button className="btn btn-ghost btn-sm">
              {" "}
              <IoCloseCircleOutline />{" "}
            </button>
          </form>
          <h3 className="font-bold text-lg">{riders?.length}</h3>
          <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Sl</th>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {riders?.map((rider, i) => (
                  <tr>
                    <th>{i + 1}</th>
                    <td>{rider?.riderName}</td>
                    <td>{rider?.riderEmail}</td>
                    <td>
                      <button
                        onClick={() => handleAssignRider(rider)}
                        className="btn btn-sm"
                      >
                        Assign
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssignRider;
