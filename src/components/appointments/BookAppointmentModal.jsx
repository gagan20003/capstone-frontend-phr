import React, { useState, useEffect } from "react";
import { X, Calendar, ChevronDown } from "lucide-react";
import Button from "../common/Button";
import { extractFormattedDateTime } from "../../utils/helper";

const BookAppointmentModal = ({
  isOpen,
  onClose,
  mode = "book", // "book" or "reschedule"
  appointment = null,
  onBook,
  onReschedule,
}) => {
  const [formData, setFormData] = useState({
    doctorName: "",
    date: "",
    time: "",
    purpose: "",
    status: "",
  });

  // Sample doctors list
  const doctors = [
    { id: 1, name: "Dr. Sarah Johnson", specialty: "Cardiologist" },
    { id: 2, name: "Dr. Michael Chen", specialty: "General Practitioner" },
    { id: 3, name: "Dr. Emily Davis", specialty: "Dermatologist" },
    { id: 4, name: "Dr. James Wilson", specialty: "Orthopedist" },
    { id: 5, name: "Dr. Lisa Anderson", specialty: "Pediatrician" },
  ];

  const timeSlots = [
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
  ];

  const formatTimeTo24h = (time12h) => {
    if (!time12h) return "";

    const [time, modifier] = time12h.split(" ");
    let [hours, minutes] = time.split(":");

    if (hours === "12") {
      hours = "00";
    }

    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12;
    }

    // Ensure leading zeros for single digits and append seconds
    return `${String(hours).padStart(2, "0")}:${minutes}:00`;
  };

  useEffect(() => {
    if (mode === "reschedule" && appointment) {
      // // Pre-fill form with appointment data
      // console.log(appointment, "date");
      // const appointmentDate = new Date(appointment.date);
      // // Format as yyyy-mm-dd for date input
      // const formattedDate = `${appointmentDate.getFullYear()}-${String(
      //   appointmentDate.getMonth() + 1
      // ).padStart(2, "0")}-${String(appointmentDate.getDate()).padStart(
      //   2,
      //   "0"
      // )}`;

      // console.log(formattedDate, "formattedDate");

      // const formattedTime = formatTimeTo24h(appointmentDate.time);

      const { formattedDate, formattedTime } = extractFormattedDateTime(
        appointment.appointmentDate
      );

      console.log(formattedDate, formattedTime);

      setFormData({
        doctorName: appointment.doctorName || "",
        date: formattedDate,
        time: formattedTime || "",
        purpose: appointment.purpose || "",
        status: appointment.status || "Scheduled",
      });
    } else {
      // Reset form for new booking
      setFormData({
        doctorName: "",
        date: "",
        time: "",
        purpose: "",
        status: "",
      });
    }
  }, [mode, appointment, isOpen]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "reschedule") {
      onReschedule({ ...formData, appointmentId: appointment?.appointmentId });
    } else {
      onBook(formData);
    }
  };

  const handleDateChange = (e) => {
    const value = e.target.value; // yyyy-mm-dd format from input
    handleChange("date", value);
  };

  if (!isOpen) return null;

  const isRescheduleMode = mode === "reschedule";
  const isFieldDisabled = isRescheduleMode;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            {isRescheduleMode
              ? "Reschedule Appointment"
              : "Book New Appointment"}
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
          {/* Select Doctor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Doctor
            </label>
            <div className="relative">
              <select
                value={formData.doctorName}
                onChange={(e) => handleChange("doctorName", e.target.value)}
                disabled={isFieldDisabled}
                className={`w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isFieldDisabled
                    ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                    : "bg-white text-gray-800"
                } appearance-none`}
                required={!isRescheduleMode}
              >
                <option value="">Select a doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.name}>
                    {doctor.name} - {doctor.specialty}
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
                min="todayAsYYYYMMDD"
                value={formData.date}
                onChange={handleDateChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
                required
              />
            </div>
          </div>

          {/* Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time
            </label>
            <div className="relative">
              <select
                value={formData.time}
                onChange={(e) => handleChange("time", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 appearance-none"
                required
              >
                <option value="">Select time</option>
                {timeSlots.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={20}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
          </div>

          {/* Reason for Visit */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason for Visit
            </label>
            <textarea
              value={formData.purpose}
              onChange={(e) => handleChange("purpose", e.target.value)}
              disabled={isFieldDisabled}
              placeholder="Describe your symptoms or reason for appointment..."
              rows={4}
              className={`w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                isFieldDisabled
                  ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                  : "bg-white text-gray-800"
              }`}
              required={!isRescheduleMode}
            />
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
              {isRescheduleMode ? "Reschedule" : "Book Appointment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookAppointmentModal;
