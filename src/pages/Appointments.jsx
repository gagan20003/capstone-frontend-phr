import React, { useState } from "react";
import Calendar from "../components/appointments/Calendar";
import AppointmentDetailCard from "../components/appointments/AppointmentDetailCard";
import Tabs from "../components/appointments/Tabs";
import BookAppointmentModal from "../components/appointments/BookAppointmentModal";
import { Plus } from "lucide-react";

function Appointments() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState("upcoming");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("book"); // "book" or "reschedule"
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Sample appointment data
  const appointments = [
    {
      id: 1,
      doctorName: "Dr. Sarah Johnson",
      date: "2025-11-26",
      time: "10:00 AM",
      address: "Heart Care Clinic - 123 Medical Plaza, Suite 400",
      description: "Follow-up appointment for blood pressure monitoring",
      status: "upcoming",
    },
    {
      id: 2,
      doctorName: "Dr. Michael Chen",
      date: "2025-11-28",
      time: "2:30 PM",
      address: "City Medical Center - 456 Health Avenue",
      description: "Annual checkup and routine examination",
      status: "upcoming",
    },
    {
      id: 3,
      doctorName: "Dr. Emily Davis",
      date: "2025-11-02",
      time: "9:00 AM",
      address: "Wellness Clinic - 789 Care Street",
      description: "Consultation for ongoing treatment",
      status: "past",
    },
    {
      id: 4,
      doctorName: "Dr. James Wilson",
      date: "2025-10-15",
      time: "11:00 AM",
      address: "Family Health Center - 321 Wellness Blvd",
      description: "Follow-up visit",
      status: "past",
    },
    {
      id: 5,
      doctorName: "Dr. Lisa Anderson",
      date: "2025-11-24",
      time: "3:00 PM",
      address: "General Practice - 555 Main Street",
      description: "Regular consultation",
      status: "upcoming",
    },
  ];

  const appointmentDates = appointments.map((apt) => ({
    date: apt.date,
  }));

  const filteredAppointments = appointments.filter(
    (apt) => apt.status === activeTab
  );

  const upcomingCount = appointments.filter((apt) => apt.status === "upcoming").length;
  const pastCount = appointments.filter((apt) => apt.status === "past").length;

  const handleReschedule = (appointmentId) => {
    const appointment = appointments.find((apt) => apt.id === appointmentId);
    setSelectedAppointment(appointment);
    setModalMode("reschedule");
    setIsModalOpen(true);
  };

  const handleCancel = (appointmentId) => {
    console.log("Cancel appointment:", appointmentId);
    // Add cancel logic here - could show confirmation dialog
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      // Handle cancellation
      console.log("Appointment cancelled:", appointmentId);
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

  const handleBook = (formData) => {
    console.log("Booking appointment:", formData);
    // Add API call to book appointment here
    // After successful booking, close modal and refresh appointments
    handleCloseModal();
    // You might want to show a success message here
  };

  const handleRescheduleSubmit = (formData) => {
    console.log("Rescheduling appointment:", formData);
    // Add API call to reschedule appointment here
    // After successful reschedule, close modal and refresh appointments
    handleCloseModal();
    // You might want to show a success message here
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Appointments</h1>
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
                    key={appointment.id}
                    appointment={appointment}
                    onReschedule={() => handleReschedule(appointment.id)}
                    onCancel={() => handleCancel(appointment.id)}
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
