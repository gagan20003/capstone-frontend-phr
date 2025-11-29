import React from "react";
import Card from "../components/Card";
import AppointmentCard from "../components/AppointmentCard";
import { Calendar, FileText, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import RecordCard from "../components/RecordCard";

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
          <p className="text-gray-600">Here's your health summary for today</p>
        </div>

        {/* section - 1 cumulated data */}
        <section className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card message="Total Appointments" number={12} icon="Calendar" />
            <Card message="Total Records" number={48} icon="FileText" />
            <Card message="Upcoming Appointments" number={3} icon="Calendar" />
            <Card message="Recent Records" number={8} icon="FileText" />
          </div>
        </section>

        {/* section - 2 first 3 appointments */}
        <section className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-8">
          <div className="flex flex-row justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="text-blue-600" size={24} />
              <h2 className="text-xl font-semibold text-gray-800">Your Appointments</h2>
            </div>
            <Link
              to={"/appointments"}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              View All
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            <AppointmentCard
              doctor="Dr. Sarah Johnson"
              purpose="Checkup"
              date="29 Nov, 2025"
              time="11 AM"
            />
            <AppointmentCard
              doctor="Dr. Michael Chen"
              purpose="Follow-up"
              date="30 Nov, 2025"
              time="2 PM"
            />
            <AppointmentCard
              doctor="Dr. Emily Davis"
              purpose="Consultation"
              date="1 Dec, 2025"
              time="10 AM"
            />
          </div>
        </section>

        {/* section - 3 first 3 medical records */}
        <section className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex flex-row justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <FileText className="text-blue-600" size={24} />
              <h2 className="text-xl font-semibold text-gray-800">Your Medical Records</h2>
            </div>
            <Link
              to={"/records"}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              View All
              <ArrowRight size={18} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <RecordCard
              testName="Complete Blood Count (CBC)"
              testType="Lab Report"
              date="26 NOV"
            />
            <RecordCard
              testName="Chest X-Ray"
              testType="Imaging"
              date="24 NOV"
            />
            <RecordCard
              testName="Lisinopril Prescription"
              testType="Prescription"
              date="20 NOV"
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
