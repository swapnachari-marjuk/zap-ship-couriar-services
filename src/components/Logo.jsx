import React from "react";
import logo from "./../assets/logo.png";

const Logo = () => {
  return (
    <div className="flex items-end">
      <img src={logo} alt="" />
      <h3 className="text-2xl w-4 -ml-4 font-bold">ZapShift</h3>
    </div>
  );
};

export default Logo;
