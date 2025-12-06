import axios from "axios";

// Detect admin mode: ?admin=true
const urlParams = new URLSearchParams(window.location.search);
const isAdmin = urlParams.get("admin") === "true";

// --- ADMIN MODE (Real DB) ---
let API = null;

if (isAdmin) {
  API = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // Real backend
  });
}

// ----- DEMO MODE (LocalStorage) -----
const DEMO_KEY = "ems_demo_data";

// Load initial data from JSON once
async function loadDemoData() {
  const existing = localStorage.getItem(DEMO_KEY);
  if (existing) return JSON.parse(existing);

  const res = await fetch("/employees-demo.json"); // load demo seed
  const data = await res.json();

  localStorage.setItem(DEMO_KEY, JSON.stringify(data));
  return data;
}

async function saveDemoData(data) {
  localStorage.setItem(DEMO_KEY, JSON.stringify(data));
}

// === PUBLIC FUNCTIONS ===

// Get all employees
export const getEmployees = async () => {
  if (isAdmin) {
    const res = await API.get("/api/employees");
    return res.data;
  }

  return await loadDemoData();
};

// Get employee by ID
export const getEmployeeById = async (id) => {
  if (isAdmin) {
    const res = await API.get(`/api/employees/${id}`);
    return res.data;
  }

  const data = await loadDemoData();
  return data.find((emp) => emp._id === id);
};

// Create new employee
export const createEmployee = async (newEmp) => {
  if (isAdmin) {
    const res = await API.post("/api/employees", newEmp);
    return res.data;
  }

  const data = await loadDemoData();
  newEmp._id = "demo_" + Date.now();
  data.push(newEmp);
  await saveDemoData(data);
  return newEmp;
};

// Update employee
export const updateEmployee = async (id, updated) => {
  if (isAdmin) {
    const res = await API.put(`/api/employees/${id}`, updated);
    return res.data;
  }

  const data = await loadDemoData();
  const index = data.findIndex((emp) => emp._id === id);
  if (index !== -1) {
    data[index] = { ...data[index], ...updated };
    await saveDemoData(data);
  }
  return data[index];
};

// Delete employee
export const deleteEmployee = async (id) => {
  if (isAdmin) {
    const res = await API.delete(`/api/employees/${id}`);
    return res.data;
  }

  let data = await loadDemoData();
  data = data.filter((emp) => emp._id !== id);
  await saveDemoData(data);
  return { success: true };
};
