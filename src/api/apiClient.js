import axios from "axios";

const apiClient = axios.create({
  baseURL : "https://localhost:7120/api/",
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

    apiClient.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

export default apiClient;
