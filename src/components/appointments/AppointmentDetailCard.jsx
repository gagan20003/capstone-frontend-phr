import React from "react";
import { Calendar, Clock, MapPin, User } from "lucide-react";
import Button from "../common/Button";

const AppointmentDetailCard = ({ appointment, onReschedule, onCancel }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <User className="text-blue-600" size={24} />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            {appointment.doctorName}
          </h3>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-3 text-gray-600">
          <Calendar className="text-blue-600" size={20} />
          <span>{formatDate(appointment.date)}</span>
        </div>

        <div className="flex items-center gap-3 text-gray-600">
          <Clock className="text-blue-600" size={20} />
          <span>{appointment.time}</span>
        </div>

        <div className="flex items-start gap-3 text-gray-600">
          <MapPin className="text-blue-600 mt-1" size={20} />
          <span>{appointment.address}</span>
        </div>
      </div>

      {appointment.description && (
        <div className="mb-6">
          <p className="text-gray-700 leading-relaxed">{appointment.description}</p>
        </div>
      )}

      <div className="flex gap-3 pt-4 border-t border-gray-200">
        <Button
          text="Reschedule"
          onClick={onReschedule}
          className="flex-1 bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-md transition"
        />
        <Button
          text="Cancel"
          onClick={onCancel}
          className="flex-1 bg-white border-2 border-red-300 text-red-600 hover:bg-red-50 px-4 py-2 rounded-md transition"
        />
      </div>
    </div>
  );
};

export default AppointmentDetailCard;

