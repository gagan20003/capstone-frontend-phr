import React, { useState, useEffect } from "react";
import { X, ChevronDown } from "lucide-react";
import Button from "../common/Button";

const AllergyModal = ({ isOpen, onClose, onSave, allergy = null }) => {
  const [formData, setFormData] = useState({
    allergyName: "",
    symptoms: "",
    severity: "",
  });

  useEffect(() => {
    if (allergy) {
      setFormData({
        allergyName: allergy.allergyName || "",
        symptoms: allergy.symptoms || "",
        severity: allergy.severity || "",
      });
    } else {
      setFormData({
        allergyName: "",
        symptoms: "",
        severity: "",
      });
    }
  }, [allergy, isOpen]);

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
            {allergy ? "Edit Allergy" : "Add New Allergy"}
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
              AllergyName
            </label>
            <input
              type="text"
              value={formData.allergyName}
              onChange={(e) => handleChange("allergyName", e.target.value)}
              placeholder="e.g., Penicillin"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reaction
            </label>
            <input
              type="text"
              value={formData.symptoms}
              onChange={(e) => handleChange("symptoms", e.target.value)}
              placeholder="e.g., Anaphylaxis, Hives"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Severity
            </label>
            <div className="relative">
              <select
                value={formData.severity}
                onChange={(e) => handleChange("severity", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                required
              >
                <option value="">Select severity</option>
                <option value="Mild">Mild</option>
                <option value="Moderate">Moderate</option>
                <option value="Severe">Severe</option>
              </select>
              <ChevronDown
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
              {allergy ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AllergyModal;
