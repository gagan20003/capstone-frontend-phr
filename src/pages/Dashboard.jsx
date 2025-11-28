import React from "react";
import Card from "../components/Card";
import AppointmentCard from "../components/AppointmentCard";
import { Calendar, Calendar1, FileText, MoveRight } from "lucide-react";
import { Link } from "react-router-dom";
import RecordCard from "../components/RecordCard";

function Dashboard() {
  return (
    <main className=" px-20">
      {/* section - 1 cumulated data */}
      <section className="shadow-lg p-4">
        <p className="my-2 text-gray font-medium">
          Here's your health summary for today
        </p>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
          <Card message="Total records" number={48} icon="FileText" />
          <Card message="Total records" number={48} icon="Folder" />
          <Card message="Total records" number={48} icon="Folder" />
          <Card message="Total records" number={48} icon="FileText" />
        </div>
      </section>

      {/* secttion - 2 first 3appointments  */}
      <section className="mt-4 rounded-xl p-4 border-2">
        <div className="flex flex-row justify-between my-4">
          <div className="flex gap-2">
            <Calendar color="blue" />
            <span>Your Appointments</span>
          </div>
          <Link to={"/appointments"}>
            <span className="text-blue-600">View All </span>
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          <AppointmentCard
            doctor="Sarah John"
            purpose="Checkup"
            date="29 Nov, 2025"
            time="11 AM"
          />
          <AppointmentCard
            doctor="Sarah John"
            purpose="Checkup"
            date="29 Nov, 2025"
            time="11 AM"
          />
          <AppointmentCard
            doctor="Sarah John"
            purpose="Checkup"
            date="29 Nov, 2025"
            time="11 AM"
          />
        </div>
      </section>

      {/* section - 3 first 3 medical records */}
      <section className="mt-4 rounded-xl p-4 border-2">
        <div className="flex flex-row justify-between my-4">
          <div className="flex gap-2">
            <FileText color="blue" />
            <span>Your Medical Records</span>
          </div>
          <Link to={"/appointments"}>
            <span className="text-blue-600">View All </span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <RecordCard
            testName="Blood Test Results"
            testType="Lab Report"
            date="26 NOV"
          />
          <RecordCard
            testName="Blood Test Results"
            testType="Lab Report"
            date="26 NOV"
          />
          <RecordCard
            testName="Blood Test Results"
            testType="Lab Report"
            date="26 NOV"
          />
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
