import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export const api = axios.create({
  baseURL: BASE_URL,
});

export const signUpUser = (data) => api.post("/api/users/signup", data);
export const loginUser = (data) => api.post("/api/users/login", data);
export const fetchBalance = () => api.get("/api/users/balance");
export const makeTransaction = (data) => api.post("/api/transactions", data);
