import * as Icons from "lucide-react";
import React from "react";

function Card({ message, number, icon }) {
  const IconComponent = Icons[icon] || Icons.FileText;
  return (
    <div className="flex flex-row justify-between p-4 shadow-sm border-gray-50 hover:shadow-md rounded-lg">
      <div className="flex flex-col">
        <p className="text-gray">{message}</p>
        <p className="text-black">{number}</p>
      </div>
      <IconComponent color="blue" size={36} />
    </div>
  );
}

export default Card;
