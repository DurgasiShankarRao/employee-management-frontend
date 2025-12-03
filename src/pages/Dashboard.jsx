// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { getEmployees } from "../api/api";
import { Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    byDept: {},
    avgSalary: 0,
    growthData: {},
  });
  const [loading, setLoading] = useState(true);

  const colors = [
    "#4caf50",
    "#2196f3",
    "#ff9800",
    "#9c27b0",
    "#f44336",
    "#00bcd4",
    "#ffc107",
    "#795548",
    "#607d8b",
  ];

  const loadStats = async () => {
    try {
      setLoading(true);
      const data = await getEmployees();
      const total = data.length;

      // Department counts
      const byDept = data.reduce((acc, e) => {
        const d = e.department || "Other";
        acc[d] = (acc[d] || 0) + 1;
        return acc;
      }, {});

      // Average salary
      const avgSalary =
        data.reduce((s, e) => s + (Number(e.salary) || 0), 0) /
        (data.length || 1);

      // Employee growth per month
      const growthData = {};
      data.forEach((e) => {
        const month = e.createdAt
          ? new Date(e.createdAt).toLocaleString("default", {
              month: "short",
              year: "numeric",
            })
          : "Nov 2025";
        growthData[month] = (growthData[month] || 0) + 1;
      });

      setStats({
        total,
        byDept,
        avgSalary: Math.round(avgSalary),
        growthData,
      });
    } catch (err) {
      console.error("Failed to load dashboard stats", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const departmentColors = Object.keys(stats.byDept).map(
    (_, idx) => colors[idx % colors.length]
  );

  const donutData = {
    labels: Object.keys(stats.byDept),
    datasets: [
      {
        data: Object.values(stats.byDept),
        backgroundColor: departmentColors,
        borderColor: "#fff",
        borderWidth: 2,
        hoverOffset: 10, // slice "pop out" effect on hover
      },
    ],
  };

  const lineData = {
    labels: Object.keys(stats.growthData),
    datasets: [
      {
        label: "Employees Added",
        data: Object.values(stats.growthData),
        fill: true,
        backgroundColor: "rgba(33, 150, 243, 0.2)",
        borderColor: "#2196f3",
        tension: 0.4, // smooth curve
        pointHoverRadius: 6, // bigger hover points
        pointBackgroundColor: "#2196f3",
        pointHoverBackgroundColor: "#ff9800",
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    animation: {
      duration: 1000, // smooth transition
      easing: "easeOutQuart",
    },
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Employee Growth Over Time" },
      tooltip: {
        callbacks: {
          label: (tooltipItem) =>
            `Added: ${tooltipItem.raw} employee(s)`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
      },
    },
  };

  const pieOptions = {
    responsive: true,
    animation: { duration: 800, easing: "easeOutQuart" },
    plugins: {
      legend: { position: "right" },
      tooltip: {
        callbacks: {
          label: (tooltipItem) =>
            `${tooltipItem.label}: ${tooltipItem.raw} employee(s)`,
        },
      },
    },
  };

  return (
    <div className="page-card">
      <h2 className="page-title">Dashboard</h2>
      {loading ? (
        <p>Loading stats...</p>
      ) : (
        <>
          {/* Top stats cards */}
          <div
            className="dashboard-grid"
            style={{ gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "16px" }}
          >
            <div className="stat-card">
              <h3>Total Employees</h3>
              <p className="stat-value">{stats.total}</p>
            </div>
            <div className="stat-card">
              <h3>Average Salary</h3>
              <p className="stat-value">₹ {stats.avgSalary}</p>
            </div>
            <div className="stat-card">
              <h3>Departments</h3>
              <ul>
                {Object.entries(stats.byDept).map(([dept, cnt]) => (
                  <li key={dept}>
                    {dept}: <strong>{cnt}</strong>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Charts */}
          <div
            className="dashboard-grid"
            style={{ gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "20px", marginTop: "24px" }}
          >
            <div className="stat-card">
              <h3>Department Distribution</h3>
              <Pie data={donutData} options={pieOptions} />
            </div>
            <div className="stat-card">
              <h3>Employee Growth Over Months</h3>
              <Line data={lineData} options={lineOptions} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
