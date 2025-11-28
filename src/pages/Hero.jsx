import React from "react";
import Button from "../components/common/Button";
import { features } from "../utils/helper";
import FeatureBox from "../components/common/FeatureBox";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/login");
  };

  return (
    <div>
      <div className="flex flex-col gap-4 align-middle text-center items-center bg-blue-100 pt-10 pb-5 px-20">
        <p className="text-4xl text-black font-bold">
          Manage Your Health Easily
        </p>
        <p className="text-xl font-semibold ">
          Book Appointments, access Medical Records, and stay on
        </p>
        <p className="text-xl font-semibold ">
          top of your health - all in one place
        </p>

        <Button text="Get Started" onClick={navigateToLogin} />
      </div>

      <div className="flex flex-col gap-4 items-center text-center my-5">
        <h2 className="text-2xl font-semibold">Features</h2>
        <div className="grid grid-cols-3  gap-4 px-20">
          {features.map((feature, index) => (
            <FeatureBox
              heading={feature.heading}
              desc={feature.feature}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Hero;
