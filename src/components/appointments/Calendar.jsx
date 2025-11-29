import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Calendar = ({ selectedDate, onDateSelect, appointments = [] }) => {
  const [currentDate, setCurrentDate] = useState(
    selectedDate || new Date(2025, 10, 24) // November 2025
  );

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const hasAppointment = (day) => {
    return appointments.some((apt) => {
      const aptDate = new Date(apt.date);
      return (
        aptDate.getDate() === day &&
        aptDate.getMonth() === month &&
        aptDate.getFullYear() === year
      );
    });
  };

  const isSelected = (day) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === month &&
      selectedDate.getFullYear() === year
    );
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleDateClick = (day) => {
    const clickedDate = new Date(year, month, day);
    onDateSelect(clickedDate);
  };

  const renderDays = () => {
    const days = [];
    // Empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(
        <div key={`empty-${i}`} className="w-10 h-10"></div>
      );
    }
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const hasApt = hasAppointment(day);
      const selected = isSelected(day);
      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(day)}
          className={`w-10 h-10 rounded-md transition-colors ${
            selected
              ? "bg-blue-600 text-white font-semibold"
              : hasApt
              ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
              : "hover:bg-gray-100"
          }`}
        >
          {day}
        </button>
      );
    }
    return days;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handlePrevMonth}
          className="p-2 hover:bg-gray-100 rounded-md transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <h3 className="text-lg font-semibold">
          {monthNames[month]} {year}
        </h3>
        <button
          onClick={handleNextMonth}
          className="p-2 hover:bg-gray-100 rounded-md transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-4">
        {dayNames.map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-600">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">{renderDays()}</div>

      <div className="mt-6 flex items-center gap-2">
        <div className="w-4 h-4 bg-blue-100 rounded"></div>
        <span className="text-sm text-gray-600">Has appointment</span>
      </div>
    </div>
  );
};

export default Calendar;

