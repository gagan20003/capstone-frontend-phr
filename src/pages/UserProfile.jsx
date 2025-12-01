import React, { useState, useEffect } from "react";
import { Edit2, AlertCircle, Pill } from "lucide-react";
import PersonalInformationSection from "../components/profile/PersonalInformationSection";
import AllergyCard from "../components/profile/AllergyCard";
import MedicationCard from "../components/profile/MedicationCard";
import AllergyModal from "../components/profile/AllergyModal";
import MedicationModal from "../components/profile/MedicationModal";
import {
  getUserProfile,
  updateUserProfile,
  getAllergies,
  createAllergy,
  updateAllergy,
  deleteAllergy,
  getMedications,
  createMedication,
  updateMedication,
  deleteMedication,
} from "../api/apiService";
import { toast } from "react-toastify";
import DashboardShimmer from "../components/common/Shimmer";

function UserProfile() {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isAllergyModalOpen, setIsAllergyModalOpen] = useState(false);
  const [isMedicationModalOpen, setIsMedicationModalOpen] = useState(false);
  const [editingAllergy, setEditingAllergy] = useState(null);
  const [editingMedication, setEditingMedication] = useState(null);

  const [profileData, setProfileData] = useState(null);
  const [allergies, setAllergies] = useState([]);
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [profile, allergiesData, medicationsData] = await Promise.all([
        getUserProfile(),
        getAllergies(),
        getMedications(),
      ]);
      setProfileData(profile);
      setAllergies(allergiesData);
      setMedications(medicationsData);
      console.log(allergies, "profiledata");
    } catch (err) {
      console.error("Failed to fetch profile data", err);
      // Handle error appropriately
    } finally {
      setLoading(false);
    }
  };

  const handleProfileChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveProfile = async () => {
    try {
      await updateUserProfile({
        age: profileData.age,
        gender: profileData.gender,
        emergencycontact: profileData.emergencycontact,
        weight: profileData.weight,
        bloodGroup: profileData.bloodGroup,
      });
      toast.success("updated details successfully");
      setIsEditingProfile(false);
    } catch (err) {
      console.error("Failed to update profile", err);
      toast.error("Failed to update profile");
    }
  };

  const handleAddAllergy = () => {
    setEditingAllergy(null);
    setIsAllergyModalOpen(true);
  };

  const handleEditAllergy = (allergy) => {
    setEditingAllergy(allergy);
    setIsAllergyModalOpen(true);
  };

  const handleSaveAllergy = async (allergyData) => {
    try {
      if (editingAllergy) {
        await updateAllergy(editingAllergy.allergyId, allergyData);
        toast.success("Updated successfully.");
      } else {
        await createAllergy(allergyData);
        toast.success("Added successfully.");
      }
      const updatedAllergies = await getAllergies();
      setAllergies(updatedAllergies);
      setIsAllergyModalOpen(false);
      setEditingAllergy(null);
    } catch (err) {
      console.error("Failed to save allergy", err);
      toast.error("Failed to save allergy");
    }
  };

  const handleDeleteAllergy = async (id) => {
    try {
      await deleteAllergy(id);
      toast.success("deleted successfully successfully.");
      setAllergies(allergies.filter((a) => a.allergyId !== id));
    } catch (err) {
      console.error("Failed to delete allergy", err);
      toast.error("Failed to delete allergy");
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

  const handleSaveMedication = async (medicationData) => {
    try {
      if (editingMedication) {
        await updateMedication(editingMedication.medicationId, medicationData);
        toast.success("Updated Successfully");
      } else {
        await createMedication(medicationData);
        toast.success("Created successfully.");
      }
      const updatedMedications = await getMedications();
      setMedications(updatedMedications);
      setIsMedicationModalOpen(false);
      setEditingMedication(null);
    } catch (err) {
      console.error("Failed to save medication", err);
      toast.error("Failed to save medication");
    }
  };

  const handleDeleteMedication = async (id) => {
    try {
      await deleteMedication(id);
      toast.success("deleted successfully successfully.");
      setMedications(medications.filter((m) => m.medicationId !== id));
    } catch (err) {
      console.error("Failed to delete medication", err);
      toast.error("Failed to delete medication");
    }
  };

  if (loading) return <DashboardShimmer />;
  if (!profileData) return <div className="p-6">Profile not found.</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Health Profile
            </h1>
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
            <p className="text-gray-500 text-center py-8">
              No allergies recorded
            </p>
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
            <p className="text-gray-500 text-center py-8">
              No medications recorded
            </p>
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
