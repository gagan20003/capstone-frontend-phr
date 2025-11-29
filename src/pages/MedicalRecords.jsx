import React, { useState } from "react";
import { Search, Upload as UploadIcon } from "lucide-react";
import MedicalRecordCard from "../components/records/MedicalRecordCard";
import FilterTabs from "../components/records/FilterTabs";
import UploadMedicalRecordModal from "../components/records/UploadMedicalRecordModal";
import DocumentViewerModal from "../components/records/DocumentViewerModal";

function MedicalRecords() {
  const [activeFilter, setActiveFilter] = useState("All Records");
  const [searchQuery, setSearchQuery] = useState("");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  // Mock document URL - same for all uploads as per requirement
  const MOCK_DOCUMENT_URL = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

  // Sample medical records data
  const [records, setRecords] = useState([
    {
      id: 1,
      title: "Complete Blood Count (CBC)",
      type: "Lab Reports",
      date: "2025-11-20",
      provider: "Dr. Sarah Johnson • City Medical Lab",
      description: "Routine blood work - All values within normal range",
      documentUrl: MOCK_DOCUMENT_URL,
    },
    {
      id: 2,
      title: "Lisinopril 10mg - 30 days",
      type: "Prescriptions",
      date: "2025-11-18",
      provider: "Dr. Sarah Johnson • Heart Care Clinic",
      description: "Blood pressure management",
      documentUrl: MOCK_DOCUMENT_URL,
    },
    {
      id: 3,
      title: "Chest X-Ray",
      type: "Imaging",
      date: "2025-11-15",
      provider: "Dr. Michael Chen • Radiology Center",
      description: "Routine chest examination",
      documentUrl: MOCK_DOCUMENT_URL,
    },
    {
      id: 4,
      title: "Annual Physical Consultation",
      type: "Consultations",
      date: "2025-11-10",
      provider: "Dr. Emily Davis • Wellness Clinic",
      description: "Annual health checkup and review",
      documentUrl: MOCK_DOCUMENT_URL,
    },
    {
      id: 5,
      title: "COVID-19 Booster",
      type: "Vaccinations",
      date: "2025-11-05",
      provider: "Dr. James Wilson • Health Center",
      description: "COVID-19 booster vaccination",
      documentUrl: MOCK_DOCUMENT_URL,
    },
    {
      id: 6,
      title: "Lipid Panel",
      type: "Lab Reports",
      date: "2025-10-28",
      provider: "Dr. Sarah Johnson • City Medical Lab",
      description: "Cholesterol and triglyceride levels",
      documentUrl: MOCK_DOCUMENT_URL,
    },
    {
      id: 7,
      title: "Follow-up Consultation",
      type: "Consultations",
      date: "2025-10-25",
      provider: "Dr. Emily Davis • Wellness Clinic",
      description: "Follow-up on previous treatment",
      documentUrl: MOCK_DOCUMENT_URL,
    },
    {
      id: 8,
      title: "Metformin 500mg - 60 days",
      type: "Prescriptions",
      date: "2025-10-20",
      provider: "Dr. Sarah Johnson • Heart Care Clinic",
      description: "Diabetes management",
      documentUrl: MOCK_DOCUMENT_URL,
    },
  ]);

  // Calculate filter counts
  const getFilterCounts = () => {
    const counts = {
      "All Records": records.length,
      "Lab Reports": records.filter((r) => r.type === "Lab Reports").length,
      "Prescriptions": records.filter((r) => r.type === "Prescriptions").length,
      "Imaging": records.filter((r) => r.type === "Imaging").length,
      "Consultations": records.filter((r) => r.type === "Consultations").length,
      "Vaccinations": records.filter((r) => r.type === "Vaccinations").length,
    };
    return counts;
  };

  const filterCounts = getFilterCounts();

  const filters = [
    { type: "All Records", label: "All Records", count: filterCounts["All Records"] },
    { type: "Lab Reports", label: "Lab Reports", count: filterCounts["Lab Reports"] },
    { type: "Prescriptions", label: "Prescriptions", count: filterCounts["Prescriptions"] },
    { type: "Imaging", label: "Imaging", count: filterCounts["Imaging"] },
    { type: "Consultations", label: "Consultations", count: filterCounts["Consultations"] },
    { type: "Vaccinations", label: "Vaccinations", count: filterCounts["Vaccinations"] },
  ];

  // Filter and search records
  const filteredRecords = records.filter((record) => {
    const matchesFilter =
      activeFilter === "All Records" || record.type === activeFilter;
    const matchesSearch =
      searchQuery === "" ||
      record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleUpload = async (formData) => {
    // Mock upload - in real app, this would call an API
    // For now, we'll add the record with the mock URL
    const newRecord = {
      id: records.length + 1,
      title: formData.title,
      type: formData.type,
      date: formData.date,
      provider: "Uploaded by User", // You can modify this
      description: "", // Optional
      documentUrl: MOCK_DOCUMENT_URL, // Same URL for all as per requirement
    };

    setRecords([newRecord, ...records]);
    setIsUploadModalOpen(false);
    // Here you would make the API call:
    // await apiClient.post('/medical-records', formData);
  };

  const handleView = (record) => {
    setSelectedDocument({
      url: record.documentUrl,
      title: record.title,
    });
    setIsViewerOpen(true);
  };

  const handleDelete = async (recordId) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      // Remove from local state
      setRecords(records.filter((r) => r.id !== recordId));
      
      // Here you would make the API call:
      // await apiClient.delete(`/medical-records/${recordId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Medical Records</h1>
            <p className="text-gray-600">View and manage your health documents</p>
          </div>
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-md transition shadow-md flex items-center gap-2"
          >
            <UploadIcon size={20} />
            Upload Record
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search
              size={20}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search records, doctors, facilities..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <FilterTabs
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          filters={filters}
        />

        {/* Records Grid */}
        {filteredRecords.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecords.map((record) => (
              <MedicalRecordCard
                key={record.id}
                record={record}
                onView={handleView}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500 text-lg">
              No records found. {searchQuery && "Try adjusting your search."}
            </p>
          </div>
        )}

        {/* Upload Modal */}
        <UploadMedicalRecordModal
          isOpen={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
          onUpload={handleUpload}
        />

        {/* Document Viewer Modal */}
        <DocumentViewerModal
          isOpen={isViewerOpen}
          onClose={() => setIsViewerOpen(false)}
          documentUrl={selectedDocument?.url}
          documentTitle={selectedDocument?.title}
        />
      </div>
    </div>
  );
}

export default MedicalRecords;
