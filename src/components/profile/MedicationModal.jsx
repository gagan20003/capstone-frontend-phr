import React, { useState, useEffect } from "react";
import { X, ChevronDown, Calendar } from "lucide-react";
import Button from "../common/Button";

const MedicationModal = ({ isOpen, onClose, onSave, medication = null }) => {
  const [formData, setFormData] = useState({
    medicineName: "",
    frequency: "",
    quantity: "",
    prescribedFor: "",
    prescribedBy: "",
    datePrescribed: "",
  });
  const [errors, setErrors] = useState("");

  useEffect(() => {
    if (medication) {
      setFormData({
        medicineName: medication.medicineName || "",
        frequency: medication.frequency || "",
        quantity: medication.quantity || "",
        prescribedBy: medication.prescribedBy || "",
        prescribedFor: medication.prescribedFor || "",
        datePrescribed: medication.datePrescribed || "",
      });
    } else {
      setFormData({
        medicineName: "",
        frequency: "",
        quantity: "",
        prescribedBy: "",
        prescribedFor: "",
        datePrescribed: "",
      });
    }
  }, [medication, isOpen]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setErrors("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.datePrescribed === "" ||
      formData.medicineName === "" ||
      formData.frequency === "" ||
      formData.quantity === "" ||
      formData.prescribedBy === "" ||
      formData.prescribedFor === ""
    ) {
      setErrors("All Fields are mandatory!");
      return;
    }

    setErrors("");

    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 ">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-y-auto max-h-[90vh]">
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

        {errors && (
          <p className="p-2 text-red-800 bg-red-400 border-red-400">{errors}</p>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Medication Name
            </label>
            <input
              type="text"
              value={formData.medicineName}
              onChange={(e) => handleChange("medicineName", e.target.value)}
              placeholder="e.g., Lisinopril"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dosage
            </label>
            <input
              type="text"
              value={formData.quantity}
              onChange={(e) => handleChange("quantity", e.target.value)}
              placeholder="e.g., 10mg - Once daily"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Frequency
            </label>
            <input
              type="text"
              value={formData.frequency}
              onChange={(e) => handleChange("frequency", e.target.value)}
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
              value={formData.prescribedFor}
              onChange={(e) => handleChange("prescribedFor", e.target.value)}
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
                type="date"
                value={formData.datePrescribed}
                onChange={(e) => handleChange("datePrescribed", e.target.value)}
                placeholder="e.g., Jan 2024"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
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
