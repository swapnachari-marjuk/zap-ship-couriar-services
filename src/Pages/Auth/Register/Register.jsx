import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../hooks/useAuth";
import { Link } from "react-router";
import GoogleLogin from "../SocialLogin/GoogleLogin";
import axios from "axios";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerUser, updateUserProfile } = useAuth();

  const [showPass, setShowPass] = useState(false);

  const handleRegister = (data) => {
    const profileImg = data?.profilePic[0];

    registerUser(data.email, data.password)
      .then((result) => {
        // set the image in form data
        const formData = new FormData();
        formData.append("image", profileImg);

        // send the photo to store and get the url
        const image_api_url = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMG_HOST_KEY
        }`;

        axios.post(image_api_url, formData).then((res) => {
          console.log("after image upload", res.data.data.url);

          // update user profile to firebase
          const userProfile = {
            displayName: data.name,
            photoURL: res.data.data.url,
          };

          updateUserProfile(userProfile)
            .then(() => console.log("user profile updated"))
            .catch((error) => console.log(error));
        });

        console.log("after create a user successfully", result);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form onSubmit={handleSubmit(handleRegister)} className="card-body">
          <fieldset className="fieldset">
            {/* NAME */}
            <label className="label font-bold">Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="input"
              placeholder="Your Name"
            />

            {errors.email?.type === "required" && (
              <p className="text-red-500 bg-red-100 p-2 my-px rounded-xl">
                ⚠ Name is Required.
              </p>
            )}

            {/* photo */}
            <label className="label font-bold">Photo</label>
            <input
              type="file"
              {...register("profilePic")}
              className="file-input file-input-primary"
              placeholder="Profile photo"
            />

            {/* email */}
            <label className="label font-bold">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input"
              placeholder="Email"
            />

            {errors.email?.type === "required" && (
              <p className="text-red-500 bg-red-100 p-2 my-px rounded-xl">
                ⚠ Email is Required.
              </p>
            )}

            {/* password */}
            <div>
              <label className="label font-bold">Password</label>
              <input
                type={showPass ? "text" : "password"}
                {...register("password", {
                  pattern:
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#?!@$%^&*-]).{6,}/,
                })}
                className="input"
                placeholder="Password"
              />

              {/* show password btn */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowPass(!showPass);
                }}
                className="btn-xs relative top-1 right-6 "
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {errors.password?.type === "pattern" && (
              <p className="text-red-500 bg-red-100 p-2 my-px rounded-xl">
                ⚠ Required a valid password
              </p>
            )}

            <button className="btn btn-primary mt-4">Register</button>
          </fieldset>
        </form>

        <div className="divider mx-5">OR</div>
        <GoogleLogin />

        <p className="text-center mb-3">
          Have an account?{" "}
          <Link className="underline" to={"/login"}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
