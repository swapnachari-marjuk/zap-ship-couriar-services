import { TruckElectric } from "lucide-react";
import React from "react";

const Works = () => {
  const data = [
    {
      id: 1,
      title: "Booking Pick & Drop",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      id: 2,
      title: "Cash On Delivery",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      id: 3,
      title: "Delivery Hub",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      id: 4,
      title: "Booking SME & Corporate",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
  ];
  return (
    <div className="lg:px-20 md:px-10 py-5">
      <h3 className="text-2xl font-bold mb-3">How it Works</h3>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5 ">
        {data.map((i) => (
          <div key={i.id} className="bg-white p-4 rounded-2xl">
            <div>
              <TruckElectric />
            </div>
            <h4>{i.title}</h4>
            <p className="text-primary-content">{i.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Works;
