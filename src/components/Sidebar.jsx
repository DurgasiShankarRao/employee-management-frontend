import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ isOpen, toggleSidebar }) {
  const location = useLocation();

  // Sidebar links only (Header has Home, About, Help)
  const links = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/list", label: "Employees" },
    { path: "/add", label: "Add Employee" },
    { path: "/reports", label: "Reports" },
    { path: "/settings", label: "Settings" },
  ];

  return (
    <>
      {/* Overlay for small screens */}
      <div
        className={`sidebar-overlay ${isOpen ? "visible" : ""}`}
        onClick={toggleSidebar}
      ></div>

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <h2 className="sidebar-title">EMS Menu</h2>
        <nav className="sidebar-nav">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`sidebar-link ${location.pathname === link.path ? "active" : ""}`}
              onClick={() => isOpen && toggleSidebar()} // close on click for mobile
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}