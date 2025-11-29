import React from "react";
import { X } from "lucide-react";

const DocumentViewerModal = ({ isOpen, onClose, documentUrl, documentTitle }) => {
  if (!isOpen || !documentUrl) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">{documentTitle || "Document Viewer"}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Document Viewer */}
        <div className="flex-1 overflow-auto p-4">
          {documentUrl.endsWith(".pdf") || documentUrl.includes("pdf") ? (
            <iframe
              src={documentUrl}
              className="w-full h-full min-h-[600px] border-0"
              title="Document Viewer"
            />
          ) : (
            <img
              src={documentUrl}
              alt={documentTitle}
              className="max-w-full h-auto mx-auto"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentViewerModal;

