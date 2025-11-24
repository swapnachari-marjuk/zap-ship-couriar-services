import React from "react";
import img1 from "../../../assets/live-tracking.png";
import img2 from "../../../assets/safe-delivery.png";

const ECards = () => {
  return (
    <div className="space-y-6  lg:mx-20 md:mx-10 py-10 my-20 border-y-2 border-dashed border-gray-300">
      <div className="flex flex-col md:flex-row gap-5 items-center bg-white rounded-2xl p-5">
        <img className="w-45" src={img1} alt="" />
        <div className="w-1 h-45 border-r-2 border-dashed border-gray-300 hidden md:block"></div>
        <div className="w-full h-px border-b-2 border-dashed border-gray-300 md:hidden"></div>
        <div>
          <h3 className="font-bold text-xl">Live Parcel Tracking</h3>
          <p className="text-primary-content">
            Stay updated in real-time with our live parcel tracking feature.
            From pick-up to delivery, monitor your shipment's journey and get
            instant status updates for complete peace of mind.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-5 items-center bg-white rounded-2xl p-5">
        <img className="w-45" src={img2} alt="" />
        <div className="w-1 h-45 border-r-2 border-dashed border-gray-300 hidden md:block"></div>
        <div className="w-full h-px border-b-2 border-dashed border-gray-300 md:hidden"></div>
        <div>
          <h3 className="font-bold text-xl">Live Parcel Tracking</h3>
          <p className="text-primary-content">
            Stay updated in real-time with our live parcel tracking feature.
            From pick-up to delivery, monitor your shipment's journey and get
            instant status updates for complete peace of mind.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-5 items-center bg-white rounded-2xl p-5">
        <img className="w-45" src={img2} alt="" />
        <div className="w-1 h-45 border-r-2 border-dashed border-gray-300 hidden md:block"></div>
        <div className="w-full h-px border-b-2 border-dashed border-gray-300 md:hidden"></div>
        <div>
          <h3 className="font-bold text-xl">Live Parcel Tracking</h3>
          <p className="text-primary-content">
            Stay updated in real-time with our live parcel tracking feature.
            From pick-up to delivery, monitor your shipment's journey and get
            instant status updates for complete peace of mind.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ECards;
