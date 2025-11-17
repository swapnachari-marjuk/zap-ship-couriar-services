import React from "react";

const Services = () => {
  const data = [
    {
      id: 1,
      title: "Express & Standard Delivery",
      details:
        "We deliver parcels within 24-72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4-6 hours from pick-up to drop-off.",
    },
    {
      id: 2,
      title: "Nationwide Delivery",
      details:
        "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48-72 hours.",
    },
    {
      id: 3,
      title: "Fulfillment Solution",
      details:
        "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    },
    {
      id: 4,
      title: "Cash on Home Delivery",
      details:
        "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    },
    {
      id: 5,
      title: "Corporate Service / Contract In Logistics",
      details:
        "Customized corporate services which includes warehouse and inventory management support.",
    },
    {
      id: 6,
      title: "Parcel Return",
      details:
        "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    },
  ];
  return (
    <div className="bg-secondary text-gray-50 p-10 my-10 rounded-2xl">
      <h3 className="text-center text-2xl font-bold">Our Services</h3>
      <p className="w-3xl text-center mx-auto font-light">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. From personal packages to business shipments — we deliver on
        time, every time.
      </p>
      <div className="grid lg:grid-cols-3 gap-4 p-5 ">
        {data.map((i) => (
          <div
            key={i.id}
            className="text-gray-800 bg-white hover:bg-primary transform transition hover:scale-105 duration-300 ease-in-out rounded-2xl p-8 flex just items-center flex-col text-center"
          >
            <div className="bg-sky-100 rounded-full">
              <img
                className=""
                src="https://img.icons8.com/officel/40/bag-diagonal-view.png"
                alt=""
              />
            </div>
            <h3 className="font-bold text-2xl my-2">{i.title}</h3>
            <p className="text-primary-content">{i.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
