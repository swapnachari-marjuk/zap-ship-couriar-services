import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Payment = () => {
  const { parcelID } = useParams();
  const axiosSecure = useAxiosSecure();
  const { data: parcel } = useQuery({
    queryKey: ["parcels", parcelID],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelID}`);
      return res.data;
    },
  });

  const handlePayment = async () => {
    const paymentInfo = {
      courierCost: parcel.courierCost,
      parcelName: parcel.parcelName,
      senderEmail: parcel.senderEmail,
      parcelID,
    };
    console.log(paymentInfo);
    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    window.location.href = res.data;
    console.log(res.data);
  };
  return (
    <div className=" flex justify-center items-center flex-col bg-white max-w-sm mx-auto mt-20 py-5 rounded-2xl ">
      <h3 className="font-bold">
        Please, Pay {parcel?.courierCost} tk for {parcel?.parcelName}
      </h3>
      <button onClick={handlePayment} className="btn btn-primary w-[50%] mt-2">
        pay
      </button>
    </div>
  );
};

export default Payment;
