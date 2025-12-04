import apiClient from "./apiClient";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API
const API_KEY =  import.meta.env.GEMINI_API_KEY; 
const genAI = new GoogleGenerativeAI(API_KEY);

export const askAI = async (prompt) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash"});
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
};



export const login = async (loginData) =>{
    const response = await apiClient.post("auth/login", loginData);
    return response.data;
}

export const signup = async (signupData) =>{
    const response = await apiClient.post("auth/register", signupData);
    return response.data;
}

// Allergies
export const getAllergies = async () => {
    const response = await apiClient.get("allergies");
    return response.data;
};

export const getAllergyById = async (id) => {
    const response = await apiClient.get(`allergies/${id}`);
    return response.data;
};

export const createAllergy = async (data) => {
    const response = await apiClient.post("allergies", data);
    return response.data;
};

export const updateAllergy = async (id, data) => {
    const response = await apiClient.put(`allergies/${id}`, data);
    return response.data;
};

export const deleteAllergy = async (id) => {
    const response = await apiClient.delete(`allergies/${id}`);
    return response.data;
};

// Appointments
export const getAppointments = async () => {
    const response = await apiClient.get("appointments");
    return response.data;
};

export const getAppointmentById = async (id) => {
    const response = await apiClient.get(`appointments/${id}`);
    return response.data;
};

export const createAppointment = async (data) => {
    const response = await apiClient.post("appointments", data);
    return response.data;
};

export const updateAppointment = async (id, data) => {
    const response = await apiClient.put(`appointments/${id}`, data);
    return response.data;
};

export const deleteAppointment = async (id) => {
    const response = await apiClient.delete(`appointments/${id}`);
    return response.data;
};

// Medications
export const getMedications = async () => {
    const response = await apiClient.get("medications");
    return response.data;
};

export const getMedicationById = async (id) => {
    const response = await apiClient.get(`medications/${id}`);
    return response.data;
};

export const createMedication = async (data) => {
    const response = await apiClient.post("medications", data);
    return response.data;
};

export const updateMedication = async (id, data) => {
    const response = await apiClient.put(`medications/${id}`, data);
    return response.data;
};

export const deleteMedication = async (id) => {
    const response = await apiClient.delete(`medications/${id}`);
    return response.data;
};

// Medical Records
export const getMedicalRecords = async () => {
    const response = await apiClient.get("records");
    return response.data;
};

export const getMedicalRecordById = async (id) => {
    const response = await apiClient.get(`records/${id}`);
    return response.data;
};

export const createMedicalRecord = async (data) => {
    const response = await apiClient.post("records", data);
    return response.data;
};

export const updateMedicalRecord = async (id, data) => {
    const response = await apiClient.put(`records/${id}`, data);
    return response.data;
};

export const deleteMedicalRecord = async (id) => {
    const response = await apiClient.delete(`records/${id}`);
    return response.data;
};

// User Profile
export const getUserProfile = async () => {
    const response = await apiClient.get("userprofile/me");
    return response.data;
};

export const updateUserProfile = async (data) => {
    const response = await apiClient.put("userprofile/me", data);
    return response.data;
};