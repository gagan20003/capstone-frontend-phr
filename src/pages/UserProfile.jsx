import React, { useState } from "react";
import { Edit2, AlertCircle, Pill } from "lucide-react";
import PersonalInformationSection from "../components/profile/PersonalInformationSection";
import AllergyCard from "../components/profile/AllergyCard";
import MedicationCard from "../components/profile/MedicationCard";
import AllergyModal from "../components/profile/AllergyModal";
import MedicationModal from "../components/profile/MedicationModal";

function UserProfile() {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isAllergyModalOpen, setIsAllergyModalOpen] = useState(false);
  const [isMedicationModalOpen, setIsMedicationModalOpen] = useState(false);
  const [editingAllergy, setEditingAllergy] = useState(null);
  const [editingMedication, setEditingMedication] = useState(null);

  const [profileData, setProfileData] = useState({
    fullName: "John Doe",
    dateOfBirth: "1985-06-15",
    gender: "Male",
    bloodType: "O+",
    height: "5'10\"",
    weight: "165 lbs",
    phone: "(555) 123-4567",
    email: "john.doe@email.com",
    emergencyContact: "Jane Doe - (555) 987-6543",
  });

  const [allergies, setAllergies] = useState([
    {
      id: 1,
      allergen: "Penicillin",
      reaction: "Anaphylaxis",
      severity: "Severe",
    },
    {
      id: 2,
      allergen: "Peanuts",
      reaction: "Hives, swelling",
      severity: "Moderate",
    },
    {
      id: 3,
      allergen: "Latex",
      reaction: "Skin irritation",
      severity: "Mild",
    },
  ]);

  const [medications, setMedications] = useState([
    {
      id: 1,
      name: "Lisinopril",
      dosage: "10mg - Once daily",
      purpose: "Blood pressure management",
      prescribedBy: "Dr. Sarah Johnson",
      startDate: "Jan 2024",
    },
    {
      id: 2,
      name: "Atorvastatin",
      dosage: "20mg - Once daily (evening)",
      purpose: "Cholesterol management",
      prescribedBy: "Dr. Michael Chen",
      startDate: "Mar 2024",
    },
    {
      id: 3,
      name: "Vitamin D3",
      dosage: "2000 IU - Once daily",
      purpose: "Vitamin D supplementation",
      prescribedBy: "Dr. Sarah Johnson",
      startDate: "Oct 2024",
    },
  ]);

  const handleProfileChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveProfile = () => {
    // Here you would make an API call to save the profile
    console.log("Saving profile:", profileData);
    setIsEditingProfile(false);
    // await apiClient.put('/profile', profileData);
  };

  const handleAddAllergy = () => {
    setEditingAllergy(null);
    setIsAllergyModalOpen(true);
  };

  const handleEditAllergy = (allergy) => {
    setEditingAllergy(allergy);
    setIsAllergyModalOpen(true);
  };

  const handleSaveAllergy = (allergyData) => {
    if (editingAllergy) {
      // Update existing allergy
      setAllergies(
        allergies.map((a) =>
          a.id === editingAllergy.id ? { ...allergyData, id: editingAllergy.id } : a
        )
      );
    } else {
      // Add new allergy
      const newAllergy = {
        ...allergyData,
        id: allergies.length > 0 ? Math.max(...allergies.map((a) => a.id)) + 1 : 1,
      };
      setAllergies([...allergies, newAllergy]);
    }
    setIsAllergyModalOpen(false);
    setEditingAllergy(null);
    // Here you would make an API call
    // await apiClient.post('/allergies', allergyData);
  };

  const handleDeleteAllergy = (id) => {
    if (window.confirm("Are you sure you want to delete this allergy?")) {
      setAllergies(allergies.filter((a) => a.id !== id));
      // Here you would make an API call
      // await apiClient.delete(`/allergies/${id}`);
    }
  };

  const handleAddMedication = () => {
    setEditingMedication(null);
    setIsMedicationModalOpen(true);
  };

  const handleEditMedication = (medication) => {
    setEditingMedication(medication);
    setIsMedicationModalOpen(true);
  };

  const handleSaveMedication = (medicationData) => {
    if (editingMedication) {
      // Update existing medication
      setMedications(
        medications.map((m) =>
          m.id === editingMedication.id
            ? { ...medicationData, id: editingMedication.id }
            : m
        )
      );
    } else {
      // Add new medication
      const newMedication = {
        ...medicationData,
        id:
          medications.length > 0
            ? Math.max(...medications.map((m) => m.id)) + 1
            : 1,
      };
      setMedications([...medications, newMedication]);
    }
    setIsMedicationModalOpen(false);
    setEditingMedication(null);
    // Here you would make an API call
    // await apiClient.post('/medications', medicationData);
  };

  const handleDeleteMedication = (id) => {
    if (window.confirm("Are you sure you want to delete this medication?")) {
      setMedications(medications.filter((m) => m.id !== id));
      // Here you would make an API call
      // await apiClient.delete(`/medications/${id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Health Profile</h1>
            <p className="text-gray-600">Your complete health information</p>
          </div>
          <button
            onClick={() => {
              if (isEditingProfile) {
                handleSaveProfile();
              } else {
                setIsEditingProfile(true);
              }
            }}
            className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-md transition shadow-md flex items-center gap-2"
          >
            <Edit2 size={20} />
            {isEditingProfile ? "Save Profile" : "Edit Profile"}
          </button>
        </div>

        {/* Personal Information Section */}
        <div className="mb-8">
          <PersonalInformationSection
            profileData={profileData}
            isEditing={isEditingProfile}
            onChange={handleProfileChange}
          />
        </div>

        {/* Allergies Section */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <AlertCircle className="text-red-600" size={20} />
              <h2 className="text-xl font-semibold text-gray-800">Allergies</h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleAddAllergy}
                className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md transition text-sm flex items-center gap-2"
              >
                Add New
              </button>
            </div>
          </div>

          {allergies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allergies.map((allergy) => (
                <div
                  key={allergy.id}
                  className="cursor-pointer"
                  onClick={() => handleEditAllergy(allergy)}
                >
                  <AllergyCard
                    allergy={allergy}
                    onDelete={(e) => {
                      e.stopPropagation();
                      handleDeleteAllergy(allergy.id);
                    }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No allergies recorded</p>
          )}
        </div>

        {/* Current Medications Section */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Pill className="text-purple-600" size={20} />
              <h2 className="text-xl font-semibold text-gray-800">
                Current Medications
              </h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleAddMedication}
                className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md transition text-sm flex items-center gap-2"
              >
                Add New
              </button>
            </div>
          </div>

          {medications.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {medications.map((medication) => (
                <div
                  key={medication.id}
                  className="cursor-pointer"
                  onClick={() => handleEditMedication(medication)}
                >
                  <MedicationCard
                    medication={medication}
                    onDelete={(e) => {
                      e.stopPropagation();
                      handleDeleteMedication(medication.id);
                    }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No medications recorded</p>
          )}
        </div>

        {/* Modals */}
        <AllergyModal
          isOpen={isAllergyModalOpen}
          onClose={() => {
            setIsAllergyModalOpen(false);
            setEditingAllergy(null);
          }}
          onSave={handleSaveAllergy}
          allergy={editingAllergy}
        />

        <MedicationModal
          isOpen={isMedicationModalOpen}
          onClose={() => {
            setIsMedicationModalOpen(false);
            setEditingMedication(null);
          }}
          onSave={handleSaveMedication}
          medication={editingMedication}
        />
      </div>
    </div>
  );
}

export default UserProfile;
