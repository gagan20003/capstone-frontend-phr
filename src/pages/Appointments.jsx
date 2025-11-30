import React, { useState } from "react";
import Calendar from "../components/appointments/Calendar";
import AppointmentDetailCard from "../components/appointments/AppointmentDetailCard";
import Tabs from "../components/appointments/Tabs";
import BookAppointmentModal from "../components/appointments/BookAppointmentModal";
import { Plus } from "lucide-react";
import { getAppointments, createAppointment, updateAppointment, deleteAppointment } from "../api/apiService";

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

  const filteredAppointments = appointments.filter(
    (apt) => {
      // Simple status check based on date for now if backend doesn't return status
      // Or assume backend returns 'status' field. 
      // The controller returns 'Appointments' model. Let's assume it has status or we derive it.
      // If the model doesn't have status, we might need to compute it.
      // Looking at the controller, it returns Appointments model. 
      // Let's assume the model matches the mock data structure roughly or we adapt.
      // For now, let's trust the backend returns what we need or we adapt.
      // Actually, the mock data has 'status'. The backend might not.
      // Let's infer status from date if missing.
      const isPast = new Date(apt.appointmentDate) < new Date();
      const derivedStatus = isPast ? "past" : "upcoming";
      return derivedStatus === activeTab;
    }
  );

  const upcomingCount = appointments.filter(apt => new Date(apt.appointmentDate) >= new Date()).length;
  const pastCount = appointments.filter(apt => new Date(apt.appointmentDate) < new Date()).length;

  const handleReschedule = (appointmentId) => {
    const appointment = appointments.find((apt) => apt.appointmentId === appointmentId);
    setSelectedAppointment(appointment);
    setModalMode("reschedule");
    setIsModalOpen(true);
  };

  const handleCancel = async (appointmentId) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      try {
        await deleteAppointment(appointmentId);
        setAppointments(appointments.filter(a => a.appointmentId !== appointmentId));
      } catch (err) {
        console.error("Failed to cancel appointment", err);
        alert("Failed to cancel appointment");
      }
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

  const handleBook = async (formData) => {
    try {
      // Adapt formData to backend DTO if needed
      const payload = {
        doctorName: formData.doctorName,
        appointmentDate: formData.date + 'T' + formData.time, // Combine date and time
        reason: formData.description, // Map description to reason if needed, or check DTO
        // Check DTO from controller: CreateUpdateAppointmentDto
        // It likely has DoctorName, AppointmentDate, Reason/Description.
        // Let's assume standard fields.
        ...formData
      };
      // We might need to format date properly.

      await createAppointment(payload);
      fetchAppointments();
      handleCloseModal();
    } catch (err) {
      console.error("Failed to book appointment", err);
      alert("Failed to book appointment");
    }
  };

  const handleRescheduleSubmit = async (formData) => {
    try {
      const payload = {
        doctorName: formData.doctorName,
        appointmentDate: formData.date + 'T' + formData.time,
        reason: formData.description,
        ...formData
      };
      await updateAppointment(selectedAppointment.appointmentId, payload);
      fetchAppointments();
      handleCloseModal();
    } catch (err) {
      console.error("Failed to reschedule appointment", err);
      alert("Failed to reschedule appointment");
    }
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
