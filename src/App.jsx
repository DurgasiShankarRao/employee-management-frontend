import "./style.css";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { getEmployees } from "./api/api";

/* pages */
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import AddEmployeePage from "./pages/AddEmployeePage";
import EmployeeListPage from "./pages/EmployeeListPage";
import About from "./pages/About";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Help from "./pages/Help";

/* components */
import Sidebar from "./components/Sidebar";

function App() {
  const [employees, setEmployees] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const loadEmployees = async () => {
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (err) {
      console.error("Failed to fetch employees for header", err);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <Router>
      <div className="app-layout">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Top header */}
<header className="topbar">
  <div className="topbar-left">
    <button className="menu-toggle" onClick={toggleSidebar} aria-label="menu">
      ☰
    </button>
    <h1 className="brand">Employee Management System</h1>
  </div>

  {/* This empty div pushes nav to right */}
  <div className="topbar-center"></div>

  <div className="topbar-right">
    <nav className="topnav">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/about" className="nav-link">About</Link>
      <Link to="/help" className="nav-link">Help</Link>
    </nav>

    <div className="employee-count">
      Employees: <strong>{employees.length}</strong>
    </div>
  </div>
</header>



        {/* Main content */}
        <main className={`main-area ${sidebarOpen ? "blurred" : ""}`}>
          <Routes>
            <Route path="/" element={<Home employees={employees} />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add" element={<AddEmployeePage refreshList={loadEmployees} />} />
            <Route path="/list" element={<EmployeeListPage refreshList={loadEmployees} />} />
            <Route path="/about" element={<About />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/help" element={<Help />} />
            <Route path="*" element={<Home employees={employees} />} />
          </Routes>
        </main>

        <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          transition={Slide}
        />
      </div>
    </Router>
  );
}

export default App;