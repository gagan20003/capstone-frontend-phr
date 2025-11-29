import React, { useState, useEffect } from "react";
import { X, ChevronDown, Calendar } from "lucide-react";
import Button from "../common/Button";

const MedicationModal = ({ isOpen, onClose, onSave, medication = null }) => {
  const [formData, setFormData] = useState({
    name: "",
    dosage: "",
    purpose: "",
    prescribedBy: "",
    startDate: "",
  });

  useEffect(() => {
    if (medication) {
      setFormData({
        name: medication.name || "",
        dosage: medication.dosage || "",
        purpose: medication.purpose || "",
        prescribedBy: medication.prescribedBy || "",
        startDate: medication.startDate || "",
      });
    } else {
      setFormData({
        name: "",
        dosage: "",
        purpose: "",
        prescribedBy: "",
        startDate: "",
      });
    }
  }, [medication, isOpen]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">
            {medication ? "Edit Medication" : "Add New Medication"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Medication Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="e.g., Lisinopril"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dosage and Frequency
            </label>
            <input
              type="text"
              value={formData.dosage}
              onChange={(e) => handleChange("dosage", e.target.value)}
              placeholder="e.g., 10mg - Once daily"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Purpose
            </label>
            <input
              type="text"
              value={formData.purpose}
              onChange={(e) => handleChange("purpose", e.target.value)}
              placeholder="e.g., Blood pressure management"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prescribed By
            </label>
            <input
              type="text"
              value={formData.prescribedBy}
              onChange={(e) => handleChange("prescribedBy", e.target.value)}
              placeholder="e.g., Dr. Sarah Johnson"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.startDate}
                onChange={(e) => handleChange("startDate", e.target.value)}
                placeholder="e.g., Jan 2024"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <Calendar
                size={20}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-gray-200">
            <Button
              text="Cancel"
              onClick={onClose}
              className="flex-1 bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-3 rounded-md transition"
            />
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white hover:bg-blue-700 px-4 py-3 rounded-md transition"
            >
              {medication ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MedicationModal;

