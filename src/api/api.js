import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Get all employees
export const getEmployees = async () => {
  const res = await API.get("/api/employees");
  return res.data;
};

// Get employee by ID
export const getEmployeeById = async (id) => {
  const res = await API.get(`/api/employees/${id}`);
  return res.data;
};

// Create new employee
export const createEmployee = async (data) => {
  const res = await API.post("/api/employees", data);
  return res.data;
};

// Update employee
export const updateEmployee = async (id, data) => {
  const res = await API.put(`/api/employees/${id}`, data);
  return res.data;
};

// Delete employee
export const deleteEmployee = async (id) => {
  const res = await API.delete(`/api/employees/${id}`);
  return res.data;
};
