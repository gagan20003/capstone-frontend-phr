import React from "react";

const FilterTabs = ({ activeFilter, onFilterChange, filters }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {filters.map((filter) => (
        <button
          key={filter.type}
          onClick={() => onFilterChange(filter.type)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeFilter === filter.type
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {filter.label} ({filter.count})
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;

