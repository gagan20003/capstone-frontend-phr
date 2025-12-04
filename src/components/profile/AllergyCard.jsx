import React, { useState } from "react";
import { Edit, Trash2, Sparkles } from "lucide-react";
import { askAI } from "../../api/apiService";
import AIResponseModal from "../common/AIResponseModal";
import { toast } from "react-toastify";

const getSeverityColor = (severity) => {
  const colors = {
    Severe: "bg-red-100 text-red-700",
    Moderate: "bg-orange-100 text-orange-700",
    Mild: "bg-yellow-100 text-yellow-700",
  };
  return colors[severity] || "bg-gray-100 text-gray-700";
};

const AllergyCard = ({ allergy, onDelete, onEdit }) => {
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const handleAskAI = async () => {
    setIsAIModalOpen(true);
    setAiLoading(true);
    setAiResponse("");

    try {
      const prompt = `I have an allergy to: ${allergy.allergyName}. 
      Severity: ${allergy.severity}.
      Symptoms: ${allergy.symptoms}.
      
      Please provide me with:
      1. Immediate actions to take if symptoms occur.
      2. Long-term prevention strategies.
      3. When to seek emergency medical help.
      
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
    <div className="bg-red-50 rounded-lg p-4 border border-red-200 relative group">
      {/* Ask AI Button */}
      <button
        onClick={handleAskAI}
        className="absolute top-2 right-2 flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-600 text-white px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-105 shadow-md z-10"
      >
        <Sparkles size={14} />
        <span className="text-xs font-medium">Ask AI</span>
      </button>

      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-800">{allergy.allergyName}</h3>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(
            allergy.severity
          )}`}
        >
          {allergy.severity}
        </span>
      </div>
      <p className="text-red-600 text-sm mb-2">{allergy.symptoms}</p>
      <div className="flex flex-row justify-between">
        <button
          onClick={() => onDelete(allergy.allergyId)}
          className=" text-red-600 hover:bg-red-100 rounded-md transition-colors cursor-pointer"
        >
          <Trash2 size={18} />
        </button>
        <button
          className="text-yellow-400 hover:bg-yellow-100 rounded-md transition-colors cursor-pointer"
          onClick={() => onEdit()}
        >
          <Edit size={18} />
        </button>
      </div>

      <AIResponseModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        response={aiResponse}
        loading={aiLoading}
        title={`AI Advice: ${allergy.allergyName}`}
      />
    </div>
  );
};

export default AllergyCard;
