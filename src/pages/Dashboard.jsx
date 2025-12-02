import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import AppointmentCard from "../components/AppointmentCard";
import { Calendar, FileText, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import RecordCard from "../components/RecordCard";
import { getAppointments, getMedicalRecords } from "../api/apiService";
import DashboardShimmer from "../components/common/Shimmer";

function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appointmentsData, recordsData] = await Promise.all([
          getAppointments(),
          getMedicalRecords(),
        ]);
        setAppointments(appointmentsData);
        setRecords(recordsData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const upcomingAppointments = appointments
    .filter((apt) => new Date(apt.appointmentDate) >= new Date())
    .slice(0, 3);
  const recentRecords = records.slice(0, 3); // Assuming records are sorted by date desc

  if (loading) {
    return (
      // <div className="min-h-screen bg-gray-50 p-6 flex justify-center items-center">
      //   Loading...
      // </div>
      <DashboardShimmer />
    );
  }

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
            <Card
              message="Total Appointments"
              number={appointments.length}
              icon="Calendar"
            />
            <Card
              message="Total Records"
              number={records.length}
              icon="FileText"
            />
            <Card
              message="Upcoming Appointments"
              number={
                appointments.filter(
                  (apt) => new Date(apt.appointmentDate) >= new Date()
                ).length
              }
              icon="Calendar"
            />
            <Card
              message="Recent Records"
              number={records.length > 5 ? 5 : records.length}
              icon="FileText"
            />
          </div>
        </section>

        {/* section - 2 first 3 appointments */}
        <section className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-8">
          <div className="flex flex-row justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="text-blue-600" size={24} />
              <h2 className="text-xl font-semibold text-gray-800">
                Your Appointments
              </h2>
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
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map((apt) => (
                <AppointmentCard
                  key={apt.appointmentId}
                  doctor={apt.doctorName}
                  purpose={apt.purpose || "Checkup"}
                  date={new Date(apt.appointmentDate).toLocaleDateString()}
                  time={new Date(apt.appointmentDate).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                />
              ))
            ) : (
              <p className="text-gray-500">No upcoming appointments.</p>
            )}
          </div>
        </section>

        {/* section - 3 first 3 medical records */}
        <section className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex flex-row justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <FileText className="text-blue-600" size={24} />
              <h2 className="text-xl font-semibold text-gray-800">
                Your Medical Records
              </h2>
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
            {recentRecords.length > 0 ? (
              recentRecords.map((record) => (
                <RecordCard
                  key={record.recordId}
                  testName={record.description}
                  testType={record.recordType}
                  date={new Date(record.recordDate).toLocaleDateString()}
                />
              ))
            ) : (
              <p className="text-gray-500">No medical records found.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
