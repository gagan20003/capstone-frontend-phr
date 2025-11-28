import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.PHR_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

    apiClient.interceptors.request.use(
      (config) => {
        // Do something before the request is sent, e.g., add an authorization token
        const token = localStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        // Do something with request error
        return Promise.reject(error);
      }
    );

export default apiClient;
