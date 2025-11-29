import apiClient from "./apiClient";

export const login = async (loginData) =>{
    const response = await apiClient.post("auth/login", loginData);
    return response.data;
}

export const signup = async (signupData) =>{
    const response = await apiClient.post("auth/register", signupData);
    return response.data;
}