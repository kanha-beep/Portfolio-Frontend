import axios from "axios";
const API_URL = process.env.API_URL
const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export default api;