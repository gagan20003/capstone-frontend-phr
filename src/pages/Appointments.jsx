import React, { useState, useEffect } from "react";
import Calendar from "../components/appointments/Calendar";
import AppointmentDetailCard from "../components/appointments/AppointmentDetailCard";
import Tabs from "../components/appointments/Tabs";
import BookAppointmentModal from "../components/appointments/BookAppointmentModal";
import { Plus } from "lucide-react";
import {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from "../api/apiService";
import { toast } from "react-toastify";
import DashboardShimmer from "../components/common/Shimmer";

function Appointments() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState("upcoming");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("book"); // "book" or "reschedule"
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const data = await getAppointments();
      setAppointments(data);
    } catch (err) {
      console.error("Failed to fetch appointments", err);
      setError("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  const appointmentDates = appointments.map((apt) => ({
    date: apt.appointmentDate,
  }));

  const filteredAppointments = appointments.filter((apt) => {
    const isPast = new Date(apt.appointmentDate) < new Date();
    const derivedStatus = isPast ? "past" : "upcoming";
    return derivedStatus === activeTab;
  });

  const upcomingCount = appointments.filter(
    (apt) => new Date(apt.appointmentDate) >= new Date()
  ).length;
  const pastCount = appointments.filter(
    (apt) => new Date(apt.appointmentDate) < new Date()
  ).length;

  const handleReschedule = (appointmentId) => {
    const appointment = appointments.find(
      (apt) => apt.appointmentId === appointmentId
    );
    setSelectedAppointment(appointment);
    setModalMode("reschedule");
    setIsModalOpen(true);
  };

  const handleCancel = async (appointmentId) => {
    try {
      await deleteAppointment(appointmentId);
      setAppointments(
        appointments.filter((a) => a.appointmentId !== appointmentId)
      );
    } catch (err) {
      console.error("Failed to cancel appointment", err);
      toast.error("Failed to cancel appointment");
    }
  };

  const handleBookAppointment = () => {
    setSelectedAppointment(null);
    setModalMode("book");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
  };
  const formatTimeTo24h = (time12h) => {
    if (!time12h) return "";

    const [time, modifier] = time12h.split(" ");
    let [hours, minutes] = time.split(":");

    if (hours === "12") {
      hours = "00";
    }

    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12;
    }

    // Ensure leading zeros for single digits and append seconds
    return `${String(hours).padStart(2, "0")}:${minutes}:00`;
  };

  const handleBook = async (formData) => {
    try {
      const formattedTime = formatTimeTo24h(formData.time);
      // Adapt formData to backend DTO if needed
      const payload = {
        doctorName: formData.doctorName,
        appointmentDate: formData.date + "T" + formattedTime, // Combine date and time
        purpose: formData.purpose,
        status: "Active", // Map description to reason if needed, or check DTO
      };

      await createAppointment(payload);
      toast.success("Booked appointment successfully.");
      fetchAppointments();
      handleCloseModal();
    } catch (err) {
      console.error("Failed to book appointment", err);
      toast.error("Failed to book appointment");
    }
  };

  const handleRescheduleSubmit = async (formData) => {
    try {
      const formattedTime = formatTimeTo24h(formData.time);

      const payload = {
        doctorName: formData.doctorName,
        appointmentDate: formData.date + "T" + formattedTime,
        purpose: formData.purpose,
        status: "Active",
      };
      await updateAppointment(selectedAppointment.appointmentId, payload);
      toast.success("Updated successfully");
      fetchAppointments();
      handleCloseModal();
    } catch (err) {
      console.error("Failed to reschedule appointment", err);
      toast.error("Failed to reschedule appointment");
    }
  };

  if (loading) {
    return <DashboardShimmer />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Appointments
            </h1>
            <p className="text-gray-600">Manage your doctor appointments</p>
          </div>
          <button
            onClick={handleBookAppointment}
            className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-md transition shadow-md flex items-center gap-2"
          >
            <Plus size={20} />
            Book Appointment
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Section - Calendar */}
          <div>
            <Calendar
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
              appointments={appointmentDates}
            />
          </div>

          {/* Right Section - Appointment List */}
          <div>
            <Tabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              upcomingCount={upcomingCount}
              pastCount={pastCount}
            />

            {/* Appointment Cards */}
            <div className="space-y-4">
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((appointment) => (
                  <AppointmentDetailCard
                    key={appointment.appointmentId}
                    appointment={appointment}
                    onReschedule={() =>
                      handleReschedule(appointment.appointmentId)
                    }
                    onCancel={() => handleCancel(appointment.appointmentId)}
                  />
                ))
              ) : (
                <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-500">
                  No {activeTab} appointments found.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Book Appointment Modal */}
      <BookAppointmentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        mode={modalMode}
        appointment={selectedAppointment}
        onBook={handleBook}
        onReschedule={handleRescheduleSubmit}
      />
    </div>
  );
}

export default Appointments;
