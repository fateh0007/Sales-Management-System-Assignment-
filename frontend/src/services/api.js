import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api"
});

export function fetchSales(params) {
  return api.get("/sales", { params }).then((res) => res.data);
}

export default api;
