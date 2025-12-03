// src/pages/Reports.jsx
import { useEffect, useState } from "react";
import { getEmployees } from "../api/api";
import { Bar, Pie } from "react-chartjs-2";
import { saveAs } from "file-saver";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

export default function Reports() {
  const [employees, setEmployees] = useState([]);
  const [stats, setStats] = useState({ byDept: {}, salaryByDept: {} });
  const [loading, setLoading] = useState(true);
  const [exportMsg, setExportMsg] = useState(""); // <-- New state for confirmation

  const colors = ["#4caf50","#2196f3","#ff9800","#9c27b0","#f44336","#00bcd4","#ffc107","#795548","#607d8b"];

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await getEmployees();
      setEmployees(data);

      const byDept = data.reduce((acc, e) => {
        const d = e.department || "Other";
        acc[d] = (acc[d] || 0) + 1;
        return acc;
      }, {});

      const salaryByDept = data.reduce((acc, e) => {
        const d = e.department || "Other";
        acc[d] = acc[d] || { sum: 0, count: 0 };
        acc[d].sum += Number(e.salary) || 0;
        acc[d].count += 1;
        return acc;
      }, {});

      const avgSalaryByDept = Object.fromEntries(
        Object.entries(salaryByDept).map(([dept, { sum, count }]) => [
          dept,
          Math.round(sum / count),
        ])
      );

      setStats({ byDept, salaryByDept: avgSalaryByDept });
    } catch (err) {
      console.error("Failed to load reports", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Chart colors
  const departmentColors = Object.keys(stats.byDept).map((_, idx) => colors[idx % colors.length]);

  // Pie chart data
  const pieData = {
    labels: Object.keys(stats.byDept),
    datasets: [{ data: Object.values(stats.byDept), backgroundColor: departmentColors }],
  };

  // Bar chart data
  const barData = {
    labels: Object.keys(stats.byDept),
    datasets: [
      { label: "Employees per Department", data: Object.values(stats.byDept), backgroundColor: departmentColors },
    ],
  };

  const salaryBarData = {
    labels: Object.keys(stats.salaryByDept),
    datasets: [
      { label: "Average Salary per Department", data: Object.values(stats.salaryByDept), backgroundColor: departmentColors },
    ],
  };

  // Export CSV
  const downloadCSV = () => {
    const csvRows = [
      ["Name", "Department", "Salary", "Designation"],
      ...employees.map(e => [e.name, e.department, e.salary, e.designation]),
    ];
    const csvContent = csvRows.map(r => r.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "employees_report.csv");

    // Show confirmation message
    setExportMsg("CSV downloaded successfully!");
    setTimeout(() => setExportMsg(""), 2000); // disappears after 2 seconds
  };

  return (
    <div className="page-card">
      <h2 className="page-title">Reports</h2>

      {loading ? (
        <p>Loading report data...</p>
      ) : (
        <>
          <button onClick={downloadCSV} className="btn-download">Download CSV</button>

          {/* Confirmation message */}
          {exportMsg && (
            <p style={{ color: "green", marginTop: "10px", fontWeight: "500" }}>{exportMsg}</p>
          )}

          <div className="dashboard-grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "20px", marginTop: "20px" }}>
            <div className="stat-card">
              <h3>Employees per Department (Pie)</h3>
              <Pie data={pieData} />
            </div>
            <div className="stat-card">
              <h3>Employees per Department (Bar)</h3>
              <Bar data={barData} options={{ responsive: true, plugins: { legend: { position: "top" }, title: { display: true, text: "Employees per Department" } } }} />
            </div>
            <div className="stat-card">
              <h3>Average Salary per Department</h3>
              <Bar data={salaryBarData} options={{ responsive: true, plugins: { legend: { position: "top" }, title: { display: true, text: "Average Salary per Department (₹)" } } }} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
