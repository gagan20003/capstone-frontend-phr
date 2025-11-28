import apiClient from "./apiClient";

export const login = async (loginData) =>{
    try{
        const response = await apiClient.post("auth/login", loginData);
        return response.data;
    }catch(err){
        console.log(err);
    }
}

export const signup = async (signupData) =>{
    try{
        const response = await apiClient.post("auth/register", signupData);
        return response.data;
    }catch(err){
        console.log(err);
    }
}