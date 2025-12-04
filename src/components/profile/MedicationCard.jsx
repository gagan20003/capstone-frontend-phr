import React, { useState } from "react";
import { Edit, Trash2, Sparkles } from "lucide-react";
import { askAI } from "../../api/apiService";
import AIResponseModal from "../common/AIResponseModal";
import { toast } from "react-toastify";

const MedicationCard = ({ medication, onDelete, onEdit }) => {
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const handleAskAI = async () => {
    setIsAIModalOpen(true);
    setAiLoading(true);
    setAiResponse("");

    try {
      const prompt = `I am taking the medication: ${medication.medicineName}. 
      Dosage: ${medication.quantity} units, ${medication.frequency} times a day.
      Prescribed for: ${medication.prescribedFor}.
      
      Please provide me with:
      1. Common side effects to watch out for.
      2. Important precautions (e.g., food interactions, activities to avoid).
      3. What to do if I miss a dose.
      
      Keep the tone helpful and professional.`;

      const response = await askAI(prompt);
      setAiResponse(response);
    } catch (error) {
      console.error("Failed to get AI response", error);
      toast.error("Failed to get AI response. Please check your API key.");
      setAiResponse("Sorry, I couldn't fetch the AI response at this time.");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 relative flex flex-col group">
      {/* Ask AI Button */}
      <button
        onClick={handleAskAI}
        className="absolute top-4 right-12 flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-105 shadow-md z-10 mr-2"
      >
        <Sparkles size={16} />
        <span className="text-sm font-medium">Ask AI</span>
      </button>

      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        {medication.medicineName}
      </h3>
      <p className="text-gray-700 mb-1">
        {medication.quantity} units {medication.frequency} times a day.
      </p>
      <p className="text-gray-600 text-sm mb-1">
        {" "}
        Taking medicine for: {medication.prescribedFor}
      </p>
      <p className="text-gray-600 text-sm mb-4">
        Prescribed by {medication.prescribedBy}
      </p>

      <div className="flex flex-row items-center justify-between">
        <p>Since: {medication.datePrescribed}</p>
        <div className="flex flex-row justify-between">
          <button
            onClick={() => onDelete(medication.medicationId)}
            className=" p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
          >
            <Trash2 size={18} />
          </button>
          <button
            onClick={() => onEdit(medication)}
            className=" p-2 text-yellow-400 hover:bg-yellow-50 rounded-md transition-colors cursor-pointer"
          >
            <Edit size={18} />
          </button>
        </div>
      </div>

      <AIResponseModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        response={aiResponse}
        loading={aiLoading}
        title={`AI Insights: ${medication.medicineName}`}
      />
    </div>
  );
};

export default MedicationCard;
