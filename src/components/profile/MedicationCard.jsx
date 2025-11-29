import React from "react";
import { Trash2 } from "lucide-react";

const MedicationCard = ({ medication, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 relative">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        {medication.name}
      </h3>
      <p className="text-gray-700 mb-1">{medication.dosage}</p>
      <p className="text-gray-600 text-sm mb-1">{medication.purpose}</p>
      <p className="text-gray-600 text-sm mb-2">
        Prescribed by {medication.prescribedBy}
      </p>
      <p className="text-gray-500 text-xs absolute bottom-4 right-4">
        Since {medication.startDate}
      </p>
      <button
        onClick={() => onDelete(medication.id)}
        className="absolute bottom-4 left-4 p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};

export default MedicationCard;

