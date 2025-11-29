import React from "react";

const Tabs = ({ activeTab, onTabChange, upcomingCount, pastCount }) => {
  return (
    <div className="flex gap-1 border-b border-gray-200 mb-6">
      <button
        onClick={() => onTabChange("upcoming")}
        className={`px-6 py-3 font-medium transition-colors ${
          activeTab === "upcoming"
            ? "text-blue-600 border-b-2 border-blue-600"
            : "text-gray-600 hover:text-gray-800"
        }`}
      >
        Upcoming ({upcomingCount})
      </button>
      <button
        onClick={() => onTabChange("past")}
        className={`px-6 py-3 font-medium transition-colors ${
          activeTab === "past"
            ? "text-blue-600 border-b-2 border-blue-600"
            : "text-gray-600 hover:text-gray-800"
        }`}
      >
        Past ({pastCount})
      </button>
    </div>
  );
};

export default Tabs;

