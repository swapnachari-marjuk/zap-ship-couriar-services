import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import GoogleLogin from "../SocialLogin/GoogleLogin";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  // console.log(location);
  const [showPass, setShowPass] = useState(false);

  const handleLogin = (data) => {
    console.log(data);
    signInUser(data.email, data.password)
      .then((result) => {
        console.log(result);
        navigate(location?.state || "/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form onSubmit={handleSubmit(handleLogin)} className="card-body">
          <fieldset className="fieldset">
            <label className="label font-bold">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input"
              placeholder="Email"
            />

            {errors.email?.type === "required" && (
              <p className="text-red-500 bg-red-100 p-2 my-px rounded-xl">
                ⚠ Please, enter a valid email.
              </p>
            )}

            <div>
              <label className="label font-bold">Password</label>
              <input
                type={showPass ? "text" : "password"}
                {...register("password", {
                  required: true,
                  pattern:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[#?!@$%^&*-])(?=.*[0-9]).{6,}$/,
                })}
                className="input"
                placeholder="Password"
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowPass(!showPass);
                }}
                className="btn-xs relative md:-left-7 md:-bottom-1 -right-[88%] bottom-[35%] "
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {errors.password?.type == "required" && (
              <p className="text-red-500 bg-red-100 p-2 my-px rounded-xl">
                ⚠ Password is required.
              </p>
            )}

            {errors.password?.type == "pattern" && (
              <p className="text-red-500 bg-red-100 p-2 my-px rounded-xl">
                ⚠ Enter a valid Password.
              </p>
            )}

            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>

            <button type="submit" className="btn btn-primary mt-2">
              Login
            </button>
          </fieldset>
        </form>

        <div className="divider mx-3">OR</div>
        <GoogleLogin />
        <p className="text-center mb-4">
          New to website?{" "}
          <Link className="underline" to={"/register"}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
