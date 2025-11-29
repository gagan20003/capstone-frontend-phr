import React from "react";
import { User } from "lucide-react";

const PersonalInformationSection = ({ profileData, isEditing, onChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex items-center gap-2 mb-6">
        <User className="text-blue-600" size={20} />
        <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={profileData.fullName || ""}
              onChange={(e) => onChange("fullName", e.target.value)}
              disabled={!isEditing}
              className={`w-full px-4 py-3 border border-gray-300 rounded-md ${
                isEditing
                  ? "bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  : "bg-gray-100 text-gray-600 cursor-not-allowed"
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender
            </label>
            <select
              value={profileData.gender || ""}
              onChange={(e) => onChange("gender", e.target.value)}
              disabled={!isEditing}
              className={`w-full px-4 py-3 border border-gray-300 rounded-md ${
                isEditing
                  ? "bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  : "bg-gray-100 text-gray-600 cursor-not-allowed"
              }`}
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Height
            </label>
            <input
              type="text"
              value={profileData.height || ""}
              onChange={(e) => onChange("height", e.target.value)}
              disabled={!isEditing}
              placeholder="e.g., 5'10&quot;"
              className={`w-full px-4 py-3 border border-gray-300 rounded-md ${
                isEditing
                  ? "bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  : "bg-gray-100 text-gray-600 cursor-not-allowed"
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone
            </label>
            <input
              type="tel"
              value={profileData.phone || ""}
              onChange={(e) => onChange("phone", e.target.value)}
              disabled={!isEditing}
              placeholder="(555) 123-4567"
              className={`w-full px-4 py-3 border border-gray-300 rounded-md ${
                isEditing
                  ? "bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  : "bg-gray-100 text-gray-600 cursor-not-allowed"
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Emergency Contact
            </label>
            <input
              type="text"
              value={profileData.emergencyContact || ""}
              onChange={(e) => onChange("emergencyContact", e.target.value)}
              disabled={!isEditing}
              placeholder="Name - Phone"
              className={`w-full px-4 py-3 border border-gray-300 rounded-md ${
                isEditing
                  ? "bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  : "bg-gray-100 text-gray-600 cursor-not-allowed"
              }`}
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              value={profileData.dateOfBirth || ""}
              onChange={(e) => onChange("dateOfBirth", e.target.value)}
              disabled={!isEditing}
              className={`w-full px-4 py-3 border border-gray-300 rounded-md ${
                isEditing
                  ? "bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  : "bg-gray-100 text-gray-600 cursor-not-allowed"
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Blood Type
            </label>
            <select
              value={profileData.bloodType || ""}
              onChange={(e) => onChange("bloodType", e.target.value)}
              disabled={!isEditing}
              className={`w-full px-4 py-3 border border-gray-300 rounded-md ${
                isEditing
                  ? "bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  : "bg-gray-100 text-gray-600 cursor-not-allowed"
              }`}
            >
              <option value="">Select blood type</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Weight
            </label>
            <input
              type="text"
              value={profileData.weight || ""}
              onChange={(e) => onChange("weight", e.target.value)}
              disabled={!isEditing}
              placeholder="e.g., 165 lbs"
              className={`w-full px-4 py-3 border border-gray-300 rounded-md ${
                isEditing
                  ? "bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  : "bg-gray-100 text-gray-600 cursor-not-allowed"
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={profileData.email || ""}
              onChange={(e) => onChange("email", e.target.value)}
              disabled={!isEditing}
              placeholder="john.doe@email.com"
              className={`w-full px-4 py-3 border border-gray-300 rounded-md ${
                isEditing
                  ? "bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  : "bg-gray-100 text-gray-600 cursor-not-allowed"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformationSection;

