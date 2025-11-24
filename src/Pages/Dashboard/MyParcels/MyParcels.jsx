import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useAuth } from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { SquareArrowOutUpRight, SquarePen, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["myParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
      return res.data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/parcels/${id}`)
          .then((res) => {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your parcel request has been deleted.",
              icon: "success",
            });
            console.log(res);
          })
          .catch((err) => console.log(err));
      }
    });

    console.log(id);
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Sl.</th>
              <th>Parcel Name</th>
              <th>Parcel Cost</th>
              <th>Delivery Status</th>
              <th>Payment Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.courierCost} tk</td>
                <td>{parcel?.deliveryStatus}</td>
                <td>
                  {parcel?.paymentStatus === "paid" ? (
                    <span className="text-lime-600 bg-lime-300 badge">Paid</span>
                  ) : (
                    <Link
                      to={`/dashboard/payment/${parcel._id}`}
                      className="btn btn-xs"
                    >
                      Pay
                    </Link>
                  )}
                </td>
                <td>
                  <button className="btn btn-xs">
                    <SquareArrowOutUpRight size={16} strokeWidth={1.75} />
                  </button>

                  <button className="btn btn-xs">
                    <SquarePen size={16} strokeWidth={1.25} />
                  </button>

                  <button
                    onClick={() => handleDelete(parcel._id)}
                    className="btn btn-xs"
                  >
                    <Trash2 size={16} strokeWidth={1.25} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;
