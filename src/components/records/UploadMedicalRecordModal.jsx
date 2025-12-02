import React, { useState, useEffect } from "react";
import { X, Calendar, ChevronDown, Upload, File } from "lucide-react";
import Button from "../common/Button";

const UploadMedicalRecordModal = ({ isOpen, onClose, onUpload }) => {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    date: "",
    file: null,
  });

  const [dragActive, setDragActive] = useState(false);
  const [fileError, setFileError] = useState("");

  const recordTypes = [
    "Lab Reports",
    "Prescriptions",
    "Imaging",
    "Consultations",
    "Vaccinations",
  ];

  useEffect(() => {
    if (!isOpen) {
      // Reset form when modal closes
      setFormData({
        title: "",
        type: "",
        date: "",
        file: null,
      });
      setFileError("");
    }
  }, [isOpen]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateFile = (file) => {
    const allowedTypes = ["application/pdf", "image/jpeg"];
    const allowedExtensions = [".pdf", ".jpg", ".jpeg"];
    const maxSize = 10 * 1024 * 1024; // 10MB

    const fileExtension = "." + file.name.split(".").pop().toLowerCase();
    const isValidType =
      allowedTypes.includes(file.type) ||
      allowedExtensions.includes(fileExtension);

    if (!isValidType) {
      return "Only PDF and JPG files are allowed";
    }

    if (file.size > maxSize) {
      return "File size must be less than 10MB";
    }

    return null;
  };

  const handleFileSelect = (file) => {
    const error = validateFile(file);
    if (error) {
      setFileError(error);
      return;
    }

    setFileError("");
    handleChange("file", file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.file) {
      setFileError("Please select a file to upload");
      return;
    }

    onUpload(formData);
  };

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
  };

  const handleDateChange = (e) => {
    handleChange("date", e.target.value);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            Upload Medical Record
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Record Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Record Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="e.g., Blood Test Results"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
              required
            />
          </div>

          {/* Record Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Record Type
            </label>
            <div className="relative">
              <select
                value={formData.type}
                onChange={(e) => handleChange("type", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 appearance-none"
                required
              >
                <option value="">Select record type</option>
                {recordTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={20}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={formData.date}
                onChange={handleDateChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
                required
              />
            </div>
          </div>

          {/* Upload File */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload File
            </label>
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-md p-8 text-center transition-colors ${
                dragActive
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <input
                type="file"
                id="file-upload"
                accept=".pdf,.jpg,.jpeg"
                onChange={handleFileInput}
                className="hidden"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                {formData.file ? (
                  <>
                    <File size={48} className="text-blue-600" />
                    <p className="text-gray-700 font-medium">
                      {formData.file.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {(formData.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </>
                ) : (
                  <>
                    <Upload size={48} className="text-gray-400" />
                    <p className="text-gray-700">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-sm text-gray-500">
                      PDF, JPG, PNG up to 10MB
                    </p>
                  </>
                )}
              </label>
            </div>
            {fileError && (
              <p className="text-red-600 text-sm mt-2">{fileError}</p>
            )}
          </div>

          {/* Action Buttons */}
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
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadMedicalRecordModal;
