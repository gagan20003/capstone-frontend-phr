import React, { useState, useEffect } from "react";
import { Search, Upload as UploadIcon } from "lucide-react";
import MedicalRecordCard from "../components/records/MedicalRecordCard";
import FilterTabs from "../components/records/FilterTabs";
import UploadMedicalRecordModal from "../components/records/UploadMedicalRecordModal";
import DocumentViewerModal from "../components/records/DocumentViewerModal";
import {
  getMedicalRecords,
  createMedicalRecord,
  deleteMedicalRecord,
} from "../api/apiService";
import { toast } from "react-toastify";
import DashboardShimmer from "../components/common/Shimmer";

function MedicalRecords() {
  const [activeFilter, setActiveFilter] = useState("All Records");
  const [searchQuery, setSearchQuery] = useState("");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  // Mock document URL - same for all uploads as per requirement
  const MOCK_DOCUMENT_URL =
    "https://www.rd.usda.gov/sites/default/files/pdf-sample_0.pdf";

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      setLoading(true);
      const data = await getMedicalRecords();
      setRecords(data);
    } catch (err) {
      console.error("Failed to fetch records", err);
      setError("Failed to load records");
    } finally {
      setLoading(false);
    }
  };

  // Calculate filter counts
  const getFilterCounts = () => {
    const counts = {
      "All Records": records.length,
      "Lab Reports": records.filter((r) => r.recordType === "Lab Reports")
        .length,
      Prescriptions: records.filter((r) => r.recordType === "Prescriptions")
        .length,
      Imaging: records.filter((r) => r.recordType === "Imaging").length,
      Consultations: records.filter((r) => r.recordType === "Consultations")
        .length,
      Vaccinations: records.filter((r) => r.recordType === "Vaccinations")
        .length,
    };
    return counts;
  };

  const filterCounts = getFilterCounts();

  const filters = [
    {
      type: "All Records",
      label: "All Records",
      count: filterCounts["All Records"],
    },
    {
      type: "Lab Reports",
      label: "Lab Reports",
      count: filterCounts["Lab Reports"],
    },
    {
      type: "Prescriptions",
      label: "Prescriptions",
      count: filterCounts["Prescriptions"],
    },
    { type: "Imaging", label: "Imaging", count: filterCounts["Imaging"] },
    {
      type: "Consultations",
      label: "Consultations",
      count: filterCounts["Consultations"],
    },
    {
      type: "Vaccinations",
      label: "Vaccinations",
      count: filterCounts["Vaccinations"],
    },
  ];

  // Filter and search records
  const filteredRecords = records.filter((record) => {
    const matchesFilter =
      activeFilter === "All Records" || record.recordType === activeFilter;
    const matchesSearch =
      searchQuery === "" ||
      record.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (record.provider &&
        record.provider.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (record.notes &&
        record.notes.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const handleUpload = async (formData) => {
    try {
      const payload = {
        description: formData.title,
        recordType: formData.type,
        recordDate: formData.date,
        provider: "Uploaded by User",
        notes: formData.description,
        fileUrl: MOCK_DOCUMENT_URL,
        ...formData,
      };
      await createMedicalRecord(payload);
      fetchRecords();
      setIsUploadModalOpen(false);
      toast.success("Added your medical recors successfully!");
    } catch (err) {
      console.error("Failed to upload record", err);
      toast.error("Failed to upload record");
    }
  };

  const handleView = (record) => {
    setSelectedDocument({
      url: record.fileUrl || MOCK_DOCUMENT_URL,
      title: record.recordName,
    });
    setIsViewerOpen(true);
  };

  const handleDelete = async (recordId) => {
    try {
      await deleteMedicalRecord(recordId);
      toast.success("successfully deleted the record");
      setRecords(records.filter((r) => r.recordId !== recordId));
    } catch (err) {
      console.error("Failed to delete record", err);
      toast.error("Failed to delete record");
    }
  };

  if (loading) {
    return <DashboardShimmer />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Medical Records
            </h1>
            <p className="text-gray-600">
              View and manage your health documents
            </p>
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
                key={record.recordId}
                record={record}
                onView={handleView}
                onDelete={() => handleDelete(record.recordId)}
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
