import React from "react";
import { useForm, useWatch } from "react-hook-form";
import riderImg from "../../assets/agent-pending.png";
import { useLoaderData, useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useAuth } from "../../hooks/useAuth";
import Swal from "sweetalert2";

const Rider = () => {
  const {
    register,
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const serviceCenters = useLoaderData();
  const regionsDuplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];

  const riderRegion = useWatch({ control, name: "riderRegion" });

  const districtByRgn = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  const handleRiderRegister = (data) => {
    console.log(data);
    axiosSecure.post("/riders", data).then((res) => {
      if (res.data.insertedId) {
        navigate("/");
        Swal.fire({
          title: "Success!",
          text: "Your request has been send.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        console.log("request send successfully.");
      }
    });
  };
  return (
    <div className="bg-white py-10 px-16 rounded-2xl m-10">
      <div className="max-w-3/4">
        <h2 className="text-4xl font-bold">Be a Rider</h2>
        <p className="text-primary-content my-4 pb-5">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </div>
      <div className="divider"></div>
      <div>
        <h3 className="font-bold text-2xl mb-3">Tell us about yourself</h3>
        <div className="flex items-center">
          <form className="flex-1" onSubmit={handleSubmit(handleRiderRegister)}>
            {/* name */}
            <div>
              <label className="font-bold">Your Name</label>
              <input
                {...register("riderName")}
                className="w-full border p-2 rounded"
                placeholder="Your Name"
                defaultValue={user.displayName}
                type="text"
                readOnly
              />
            </div>

            {/* email */}
            <div>
              <label className="font-bold">Your Email</label>
              <input
                {...register("riderEmail")}
                className="w-full border p-2 rounded"
                placeholder="Your Email"
                defaultValue={user.email}
                type="email"
                readOnly
              />
            </div>

            {/* region */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Rider Region</legend>
              <select
                {...register("riderRegion")}
                defaultValue={"Pick a Region"}
                className="select"
                required
              >
                <option disabled={true}>Pick a Region</option>
                {regions.map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* district */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Sender District</legend>
              <select
                {...register("riderDistrict")}
                defaultValue="Pick a District"
                className="select"
                required
              >
                <option disabled={true}>Pick a District</option>
                {districtByRgn(riderRegion).map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* phone */}
            <div>
              <label className="font-bold">Your Phone Number</label>
              <input
                {...register("riderPhoneNumber")}
                className="w-full border p-2 rounded"
                placeholder="Your Phone Number"
                type="tel"
                required
              />
            </div>

            {/* nid */}
            <div>
              <label className="font-bold">Your NID Number</label>
              <input
                {...register("riderNID")}
                className="w-full border p-2 rounded"
                placeholder="Your NID Number"
                type="text"
                required
              />
            </div>

            {/* license */}
            <div>
              <label className="font-bold">Your Driving License</label>
              <input
                {...register("drivingLicense")}
                className="w-full border p-2 rounded"
                placeholder="Your Driving License"
                type="text"
                required
              />
            </div>

            {/*                 
            <div>
              <label className="font-bold">Your NID Number</label>
              <input
                {...register("riderNID")}
                className="w-full border p-2 rounded"
                placeholder="Your Phone Number"
                type="email"
              />
            </div> */}

            <button className="btn btn-primary">Submit</button>
          </form>
          <div>
            <img src={riderImg} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rider;
