import React from "react";
import Marquee from "react-fast-marquee";
import amzImg from "../../../assets/brands/amazon.png";
import casioImg from "../../../assets/brands/casio.png";
import moonStarImg from "../../../assets/brands/moonstar.png";
import randStadImg from "../../../assets/brands/randstad.png";
import startPeopleImg from "../../../assets/brands/start_people.png";

const Brands = () => {
  return (
    <div className="my-20">
      <h3 className="text-center font-bold text-2xl pb-4">
        We've helped thousands of sales teams
      </h3>
      <Marquee>
        <img className="mx-8" src={amzImg} alt="" />
        <img className="mx-8" src={casioImg} alt="" />
        <img className="mx-8" src={moonStarImg} alt="" />
        <img className="mx-8" src={randStadImg} alt="" />
        <img className="mx-8" src={startPeopleImg} alt="" />
      </Marquee>
    </div>
  );
};

export default Brands;
