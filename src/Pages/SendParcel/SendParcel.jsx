import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useAuth } from "../../hooks/useAuth";

const SendParcel = () => {
  const { register, handleSubmit, control } = useForm();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const serviceCenters = useLoaderData();
  const regionsDuplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];

  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });

  const districtByRgn = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  const onSubmit = (data) => {
    const isDocument = data.parcelType === "document";
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const parcelWeight = parseFloat(data?.parcelWeight);

    let cost = 0;

    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const mainCost = isSameDistrict ? 110 : 150;

        const extraWeight = parcelWeight - 3;
        const extraCost = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;

        cost = mainCost + extraCost;
      }
    }

    data.courierCost = cost;

    Swal.fire({
      title: `You will be charged ${cost} taka.`,
      text: "Are you wanted to send parcel with this cost?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#caeb66",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I agree!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .post("/parcels", data)
          .then((res) => console.log("after saving data", res))
          .catch((err) => console.log(err));
        Swal.fire({
          icon: "success",
          title: "Your Parcel Request accepted. Pay for confirmation",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/myParcels");
      }
    });

    console.log("Cost is", cost, "tk");
    console.log(data);
  };

  return (
    <div className="bg-white rounded-2xl m-10 md:px-20 px-10 md:py-16 py-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Title */}
        <div className="border-b pb-4 border-gray-300">
          <h1 className="text-3xl font-semibold">Send A Parcel</h1>
          <p className="text-gray-600 mt-1">Enter your parcel details</p>
        </div>

        {/* Document Type */}
        <div className="flex  items-center md:gap-10 gap-5">
          <label className="flex items-center gap-2">
            <input
              className="radio radio-xs"
              type="radio"
              value="document"
              {...register("parcelType")}
              defaultChecked
            />
            <span>Document</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              className="radio  radio-xs"
              type="radio"
              value="non-document"
              {...register("parcelType")}
            />
            <span>Not Document</span>
          </label>
        </div>

        <div className="flex lg:flex-row flex-col lg:gap-10 gap-5">
          {/* Parcel Name */}
          <div className="flex-1">
            <label>Parcel Name</label>
            <input
              {...register("parcelName")}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Parcel Weight */}
          <div className="flex-1">
            <label>Parcel Weight (KG)</label>
            <input
              type="number"
              {...register("parcelWeight")}
              className="w-full border p-2 rounded"
              defaultValue={0}
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* Left Column */}
          <div className="space-y-6">
            <h3 className="font-semibold text-lg mt-4">Sender Details</h3>

            {/* sender name */}
            <div>
              <label>Sender Name</label>
              <input
                {...register("senderName")}
                className="w-full border p-2 rounded"
                defaultValue={user.displayName}
              />
            </div>

            {/* sender address */}
            <div>
              <label>Email</label>
              <input
                type="email"
                {...register("senderEmail")}
                className="w-full border p-2 rounded"
                defaultValue={user.email}
              />
            </div>

            {/* sender phone */}
            <div>
              <label>Sender Phone No</label>
              <input
                {...register("senderPhone")}
                className="w-full border p-2 rounded"
              />
            </div>

            {/* sender region */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Sender Region</legend>
              <select
                {...register("senderRegion")}
                defaultValue="Pick a Region"
                className="select"
              >
                <option disabled={true}>Pick a Region</option>
                {regions.map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* sender districts */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Sender District</legend>
              <select
                {...register("senderDistrict")}
                defaultValue="Pick a District"
                className="select"
              >
                <option disabled={true}>Pick a District</option>
                {districtByRgn(senderRegion).map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* pickup instruction */}
            <div>
              <label>Pickup Instruction</label>
              <input
                {...register("pickupInstruction")}
                className="w-full border p-2 rounded"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <h3 className="font-semibold text-lg mt-4">Receiver Details</h3>

            {/* receiver name */}
            <div>
              <label>Receiver Name</label>
              <input
                {...register("receiverName")}
                className="w-full border p-2 rounded"
              />
            </div>

            {/* receiver address */}
            <div>
              <label>Receiver Email</label>
              <input
                {...register("receiverEmail")}
                className="w-full border p-2 rounded"
                type="email"
              />
            </div>

            {/* receiver contact no */}
            <div>
              <label>Receiver Contact No</label>
              <input
                {...register("receiverPhone")}
                className="w-full border p-2 rounded"
              />
            </div>

            {/* receiver region */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Receiver Region</legend>
              <select
                {...register("receiverRegion")}
                defaultValue="Pick a Region"
                className="select"
              >
                <option disabled={true}>Pick a Region</option>
                {regions.map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* receiver district */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Receiver District</legend>
              <select
                {...register("receiverDistrict")}
                defaultValue="Pick a District"
                className="select"
              >
                <option disabled={true}>Pick a District</option>
                {districtByRgn(receiverRegion).map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* receiver instruction */}
            <div>
              <label>Delivery Instruction</label>
              <input
                {...register("deliveryInstruction")}
                className="w-full border p-2 rounded"
              />
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <p className="text-sm text-gray-600">* PickUp Time 4pm–7pm Approx.</p>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary px-6 py-2 rounded text-black font-medium"
        >
          Proceed to Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default SendParcel;
