import React from "react";
import { Trash2 } from "lucide-react";

const MedicationCard = ({ medication, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 relative flex flex-col">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        {medication.medicineName}
      </h3>
      <p className="text-gray-700 mb-1">
        {medication.quantity} units {medication.frequency} times a day.
      </p>
      <p className="text-gray-600 text-sm mb-1">
        {" "}
        Taking medicine for: {medication.prescribedFor}
      </p>
      <p className="text-gray-600 text-sm mb-4">
        Prescribed by {medication.prescribedBy}
      </p>

      <div className="flex flex-row items-center justify-between">
        <p>Since: {medication.datePrescribed}</p>
        <button
          onClick={() => onDelete(medication.id)}
          className=" p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default MedicationCard;
