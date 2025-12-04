import React from "react";
import { User } from "lucide-react";

const PersonalInformationSection = ({ profileData, isEditing, onChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex items-center gap-2 mb-6">
        <User className="text-blue-600" size={20} />
        <h2 className="text-xl font-semibold text-gray-800">
          Personal Information
        </h2>
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
              value={profileData.user.fullName || ""}
              onChange={(e) => onChange("fullName", e.target.value)}
              disabled={true} //always disabled
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
              Emergency Contact
            </label>
            <input
              type="text"
              value={profileData.emergencycontact || ""}
              onChange={(e) => onChange("emergencycontact", e.target.value)}
              disabled={!isEditing}
              placeholder="+91 9999999999"
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
              Age
            </label>
            <input
              type="text"
              value={profileData.age || ""}
              onChange={(e) => onChange("age", e.target.value)}
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
              Blood Group
            </label>
            <select
              value={profileData.bloodGroup || ""}
              onChange={(e) => onChange("bloodGroup", e.target.value)}
              disabled={!isEditing}
              className={`w-full px-4 py-3 border border-gray-300 rounded-md ${
                isEditing
                  ? "bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  : "bg-gray-100 text-gray-600 cursor-not-allowed"
              }`}
            >
              <option value="">Select blood group</option>
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
              Weight(in kgs)
            </label>
            <input
              type="text"
              value={profileData.weight || ""}
              onChange={(e) => onChange("weight", e.target.value)}
              disabled={!isEditing}
              placeholder="e.g., 67"
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
              value={profileData.user.email || ""}
              onChange={(e) => onChange("email", e.target.value)}
              disabled={true} //always disabled
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
