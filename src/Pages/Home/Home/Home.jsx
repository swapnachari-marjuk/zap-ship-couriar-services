import React from "react";
import Logo from "../../../components/Logo";
import Banner from "../Banner/Banner";
import Works from "../HIWorks/Works";
import Services from "../Services/Services";
import Brands from "../Brands/Brands";
import ECards from "../ECards/ECards";
import Reviews from "../Reviews/Reviews";
import FAQ from "../FAQ/FAQ";

const reviewsPromise = fetch("/reviews.json").then((res) => res.json());

const Home = () => {
  return (
    <div>
      <Banner />
      <Works />
      <Services />
      <Brands />
      <ECards />
      <Reviews reviewsPromise={reviewsPromise} />
      <FAQ />
    </div>
  );
};

export default Home;
