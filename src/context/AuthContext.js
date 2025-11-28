
// import React, { createContext, useContext, useEffect, useState } from "react";
// import { login as loginfunction, signup as signupFunction } from "../api/apiService";

// const AuthContext = createContext(null);
// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(null);

//   useEffect(() => {
//     const storedToken = localStorage.getItem("auth_token");
//     if (storedToken) setToken(storedToken);
//   }, []);

//   const isLoggedIn = !!token;

//   const login = async (credentials) => {
//     try {
//       const res = await loginfunction(credentials); // Axios response
//       const data = res.data;
//       const receivedToken = data.token;

//       localStorage.setItem("auth_token", receivedToken);
//       setToken(receivedToken);

//       return data;
//     } catch (err) {
//       console.error("Login error:", err);
//       throw err;
//     }
//   };

//   const signup = async (payload) => {
//     try {
//       const res = await signupFunction(payload);
//       const data = res.data;

//       // If signup should also log in:
//       if (data.token) {
//         localStorage.setItem("auth_token", data.token);
//         setToken(data.token);
//       }

//       return data;
//     } catch (err) {
//       console.error("Signup error:", err);
//       throw err;
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem("auth_token");
//     setToken(null);
//   };

//   const value = { token, isLoggedIn, login, signup, logout };


//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };
