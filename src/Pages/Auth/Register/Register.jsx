import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Register = () => {
  const { register, handleSubmit } = useForm();
  const [showPass, setShowPass] = useState(false);

  const handleRegister = (data) => {
    console.log(data);
  };

  return (
    <div>
      <h1>Hello to ZapShift|| Register Account</h1>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form onSubmit={handleSubmit(handleRegister)} className="card-body">
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input"
              placeholder="Email"
            />

            <div>
              <label className="label">Password</label>
              <input
                type={showPass ? "text" : "password"}
                {...register("password", {
                  pattern:
                    /^(?=.?[A-Z])(?=.?[a-z])(?=.?[0-9])(?=.*?[#?!@$%^&*-]).{6,}/,
                })}
                className="input"
                placeholder="Password"
              />
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
            <button className="btn btn-neutral mt-4">Login</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Register;
