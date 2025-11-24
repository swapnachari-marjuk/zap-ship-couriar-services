import React from "react";
import { useNavigate } from "react-router";

const CancelPayment = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center flex-col bg-white max-w-sm mx-auto mt-20 py-5 rounded-2xl">
      <p className="text-red-500 font-bold">Your payment is canceled.</p>
      <button className="btn btn-primary mt-2" onClick={() => navigate("/dashboard/myParcels")}>Go Back</button>
    </div>
  );
};

export default CancelPayment;
