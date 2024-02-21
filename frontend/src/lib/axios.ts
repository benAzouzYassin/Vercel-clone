import axios from "axios";

const backendUrl = "http://localhost:5000"
export const api = axios.create({ baseURL: backendUrl, withCredentials: true })