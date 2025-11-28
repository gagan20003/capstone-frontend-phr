import { Calendar, Clock } from "lucide-react";
import React from "react";

function AppointmentCard({ doctor, purpose, date, time }) {
  return (
    <div className="flex flex-col gap-2 p-2 border-gray-300 border-2 rounded-lg hover:border-blue-500">
      <div className="flex flex-row items-center gap-2">
        <p className="text-xl">{doctor}</p>
        <span className="p-1 bg-green-200 rounded-lg text-xs text-green-700">
          {purpose}
        </span>
      </div>
      <div className="flex flex-row items-center gap-2">
        <Calendar color="gray" size={20} />
        <p className="text-gray-500">{date}</p>
      </div>
      <div className="flex flex-row items-center gap-2">
        <Clock color="gray" size={20} />
        <p className="text-gray-500">{time}</p>
      </div>
    </div>
  );
}

export default AppointmentCard;
