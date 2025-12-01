import React from "react";
import { Trash2 } from "lucide-react";

const getSeverityColor = (severity) => {
  const colors = {
    Severe: "bg-red-100 text-red-700",
    Moderate: "bg-orange-100 text-orange-700",
    Mild: "bg-yellow-100 text-yellow-700",
  };
  return colors[severity] || "bg-gray-100 text-gray-700";
};

const AllergyCard = ({ allergy, onDelete }) => {
  return (
    <div className="bg-red-50 rounded-lg p-4 border border-red-200">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-800">{allergy.allergyName}</h3>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(
            allergy.severity
          )}`}
        >
          {allergy.severity}
        </span>
      </div>
      <p className="text-red-600 text-sm mb-2">{allergy.symptoms}</p>
      <button
        onClick={() => onDelete(allergy.allergyId)}
        className=" text-red-600 hover:bg-red-100 rounded-md transition-colors"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};

export default AllergyCard;
