import { FileText } from "lucide-react";
import React from "react";

function RecordCard({ testName, testType, date }) {
  return (
    <div className="flex flex-row gap-2 p-2 border-gray-300 border-2 rounded-lg hover:border-blue-500">
      <FileText />
      <div className="flex flex-col gap-2">
        <p>{testName}</p>
        <p>{testType}</p>
        <p>{date}</p>
      </div>
    </div>
  );
}

export default RecordCard;
