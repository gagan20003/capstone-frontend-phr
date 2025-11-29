import * as Icons from "lucide-react";
import React from "react";

function Card({ message, number, icon }) {
  const IconComponent = Icons[icon] || Icons.FileText;
  return (
    <div className="flex flex-row justify-between items-center p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col">
        <p className="text-gray-600 text-sm font-medium mb-1">{message}</p>
        <p className="text-2xl font-bold text-gray-800">{number}</p>
      </div>
      <div className="bg-blue-100 p-3 rounded-full">
        <IconComponent className="text-blue-600" size={28} />
      </div>
    </div>
  );
}

export default Card;
