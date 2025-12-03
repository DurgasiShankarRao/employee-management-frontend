// src/pages/Home.jsx
import { Link } from "react-router-dom";
import { FaUserPlus, FaUsers, FaChartPie, FaCog, FaFileAlt } from "react-icons/fa";

export default function Home({ employees }) {
  // Compute quick stats if employees prop exists
  const totalEmployees = employees?.length || 0;
  const avgSalary =
    employees && employees.length
      ? Math.round(employees.reduce((sum, e) => sum + (Number(e.salary) || 0), 0) / employees.length)
      : 0;
  const departments = employees
    ? [...new Set(employees.map(e => e.department || "Other"))].length
    : 0;

  return (
    <div className="home-page page-card">
      {/* Welcome Banner */}
      <div className="home-banner">
        <h2>Welcome to the Employee Management System</h2>
        <p>Manage your employees efficiently with search, charts, and easy CRUD operations.</p>
      </div>

      {/* Quick Action Cards */}
      <div className="home-actions">
        <Link to="/add" className="action-card">
          <FaUserPlus size={32} />
          <span>Add Employee</span>
        </Link>
        <Link to="/list" className="action-card">
          <FaUsers size={32} />
          <span>View Employees</span>
        </Link>
        <Link to="/dashboard" className="action-card">
          <FaChartPie size={32} />
          <span>Dashboard</span>
        </Link>
        <Link to="/reports" className="action-card">
          <FaFileAlt size={32} />
          <span>Reports</span>
        </Link>
        <Link to="/settings" className="action-card">
          <FaCog size={32} />
          <span>Settings</span>
        </Link>
      </div>

      {/* Feature Highlights */}
      <div className="home-features">
        <h3>Key Features</h3>
        <ul>
          <li>✔ Add / Edit / Delete Employees</li>
          <li>✔ Search, Sort, Pagination</li>
          <li>✔ Dashboard with Charts</li>
          <li>✔ Export Reports</li>
          <li>✔ Settings & Preferences</li>
        </ul>
      </div>

      {/* Quick Stats Snapshot */}
      <div className="home-stats">
        <div className="stat-card">
          <h4>Total Employees</h4>
          <p>{totalEmployees}</p>
        </div>
        <div className="stat-card">
          <h4>Average Salary</h4>
          <p>₹ {avgSalary}</p>
        </div>
        <div className="stat-card">
          <h4>Departments</h4>
          <p>{departments}</p>
        </div>
      </div>
    </div>
  );
}
