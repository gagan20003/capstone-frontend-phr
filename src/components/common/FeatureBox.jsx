import React from "react";
import { Calendar, FileText, Shield } from "lucide-react";

function FeatureBox({ heading, desc }) {
  const getIcon = () => {
    if (heading === "Appointments") {
      return <Calendar className="text-blue-600" size={40} />;
    } else if (heading === "Medical Records") {
      return <FileText className="text-blue-600" size={40} />;
    } else {
      return <Shield className="text-blue-600" size={40} />;
    }
  };

  return (
    <div className="flex flex-col gap-4 border border-gray-200 p-8 rounded-lg items-center bg-white shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
      <div className="bg-blue-100 p-4 rounded-full">{getIcon()}</div>
      <h3 className="text-2xl font-semibold text-gray-800">{heading}</h3>
      <p className="text-gray-600 text-center">{desc}</p>
    </div>
  );
}

export default FeatureBox;
