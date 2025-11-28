import React from "react";

function FeatureBox({ heading, desc }) {
  return (
    <div className="flex flex-col gap-2 border border-gray-200 p-2 rounded-md items-center bg-gray-50 shadow-sm hover:shadow-md">
      <h3 className="text-xl font-semibold">{heading}</h3>
      <p>{desc}</p>
    </div>
  );
}

export default FeatureBox;
