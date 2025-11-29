import React from "react";
import { FileText, Calendar, User, Eye, Trash2 } from "lucide-react";
import Button from "../common/Button";

const getRecordTypeColor = (type) => {
  const colors = {
    "Lab Reports": "bg-blue-100 text-blue-700",
    "Prescriptions": "bg-green-100 text-green-700",
    "Imaging": "bg-purple-100 text-purple-700",
    "Consultations": "bg-orange-100 text-orange-700",
    "Vaccinations": "bg-yellow-100 text-yellow-700",
  };
  return colors[type] || "bg-gray-100 text-gray-700";
};

const getRecordTypeIconColor = (type) => {
  const colors = {
    "Lab Reports": "text-blue-600",
    "Prescriptions": "text-green-600",
    "Imaging": "text-purple-600",
    "Consultations": "text-orange-600",
    "Vaccinations": "text-yellow-600",
  };
  return colors[type] || "text-gray-600";
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

const MedicalRecordCard = ({ record, onView, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      {/* Icon and Title */}
      <div className="flex items-start gap-4 mb-4">
        <div className={`${getRecordTypeIconColor(record.type)}`}>
          <FileText size={32} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {record.title}
          </h3>
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getRecordTypeColor(
              record.type
            )}`}
          >
            {record.type}
          </span>
        </div>
      </div>

      {/* Date */}
      <div className="flex items-center gap-2 text-gray-600 mb-2">
        <Calendar size={18} className="text-blue-600" />
        <span className="text-sm">{formatDate(record.date)}</span>
      </div>

      {/* Provider */}
      <div className="flex items-center gap-2 text-gray-600 mb-3">
        <User size={18} className="text-blue-600" />
        <span className="text-sm">{record.provider}</span>
      </div>

      {/* Description */}
      {record.description && (
        <p className="text-gray-700 text-sm mb-4 line-clamp-2">
          {record.description}
        </p>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4 border-t border-gray-200">
        <button
          onClick={() => onView(record)}
          className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md transition"
        >
          <Eye size={18} />
          View
        </button>
        <button
          onClick={() => onDelete(record.id)}
          className="flex items-center justify-center gap-2 bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-md transition"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default MedicalRecordCard;

