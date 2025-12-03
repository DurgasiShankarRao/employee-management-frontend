// src/pages/About.jsx
import { FaReact, FaNodeJs, FaDatabase, FaGithub, FaLinkedin } from "react-icons/fa";

export default function About() {
  const features = [
    "Add / Edit / Delete employees",
    "Search, Sort, Pagination",
    "Dashboard with charts",
    "Responsive and clean UI",
    "Toast notifications",
  ];

  return (
    <div className="page-card about-page">
      <h2 className="page-title">About Employee Management System</h2>

      {/* Project Overview */}
      <section className="about-section">
        <h3>Project Overview</h3>
        <p>
          This is a full-stack Employee Management System (EMS) demo built with React + Vite for frontend, Node.js + Express for backend, and MongoDB Atlas for the database. 
          It demonstrates CRUD operations, charts, search, sort, pagination, and modern UI practices.
        </p>
      </section>

      {/* Tech Stack */}
      <section className="about-section">
        <h3>Tech Stack</h3>
        <div className="tech-cards">
          <div className="tech-card">
            <FaReact size={36} color="#61dafb" />
            <span>React + Vite</span>
          </div>
          <div className="tech-card">
            <FaNodeJs size={36} color="#68a063" />
            <span>Node.js + Express</span>
          </div>
          <div className="tech-card">
            <FaDatabase size={36} color="#f29111" />
            <span>MongoDB Atlas</span>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="about-section">
        <h3>Key Features</h3>
        <ul className="feature-list">
          {features.map((feat, idx) => (
            <li key={idx}>✔ {feat}</li>
          ))}
        </ul>
      </section>

      {/* Author / Team Info */}
      <section className="about-section">
        <h3>Author</h3>
        <p>Durgasi Sankar Rao – Full Stack Developer / ECE Student</p>
        <div className="author-links">
          <a href="https://github.com/DurgasiShankarRao" target="_blank"><FaGithub /> GitHub</a>
          <a href="https://www.linkedin.com/in/durgasishankarrao/" target="_blank"><FaLinkedin /> LinkedIn</a>
        </div>
      </section>

      {/* App Info */}
      <section className="about-section">
        <h3>App Info</h3>
        <p>Version: 1.0.0</p>
        <p>License: MIT</p>
      </section>
    </div>
  );
}
