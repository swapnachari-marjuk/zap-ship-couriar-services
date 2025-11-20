import React from "react";
import Logo from "../../components/Logo";
import { Outlet } from "react-router";
import authImg from "../../assets/authImage.png";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-linear-to-r from-white via-[#F7FCEA] to-[#e6f6bc] flex flex-col">
      {/* Logo */}
      <div className="py-6 px-10">
        <Logo />
      </div>

      {/* Main Layout */}
      <div className="flex flex-1">
        {/* Left side (Form Section) */}
        <div className="w-1/2 flex items-center justify-center px-10">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </div>

        {/* Right side (Image Section) */}
        <div className="w-1/2 flex items-center justify-center ">
          <img src={authImg} alt="auth" className="w-[70%]" />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
