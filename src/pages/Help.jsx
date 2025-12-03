// src/pages/Help.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";

export default function Help() {
  const faqs = [
    {
      question: "How to add employees?",
      answer: (
        <>
          Go to <Link to="/add" className="link-inline">Add Employee</Link> page and fill in the form.
        </>
      ),
    },
    {
      question: "How to view employees?",
      answer: (
        <>
          Use <Link to="/list" className="link-inline">View Employees</Link> to see, search, sort, and paginate the employee list.
        </>
      ),
    },
    {
      question: "What can I see on Dashboard?",
      answer: (
        <>
          View charts and statistics about employees, including department distribution and average salary.
        </>
      ),
    },
    {
      question: "How to generate Reports?",
      answer: (
        <>
          Go to <Link to="/reports" className="link-inline">Reports</Link> page to export employee data.
        </>
      ),
    },
    {
      question: "What can I customize in Settings?",
      answer: (
        <>
          Adjust theme, export preferences and chart settings in <Link to="/settings" className="link-inline">Settings</Link>.
        </>
      ),
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null); // success or error

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🚀 SEND EMAIL
  const sendMessage = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      setStatus("error");
      setTimeout(() => setStatus(null), 2000);
      return;
    }

    emailjs
      .send(
        "service_4ua7q9j",      // your Gmail service
        "template_um3aw9f",     // your template
        form,
        "Q_z6YahzSMcrm4l0T"     // your public key
      )
      .then(() => {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });

        setTimeout(() => setStatus(null), 2000); // auto hide
      })
      .catch((err) => {
        console.error(err);
        setStatus("error");
        setTimeout(() => setStatus(null), 2000);
      });
  };

  return (
    <div className="page-card">
      <h2 className="page-title">Help & FAQ</h2>
      <p>Welcome to the Employee Management System help section. Click a question to view the answer:</p>

      {/* FAQ LIST */}
      <div className="faq-list">
        {faqs.map((faq, idx) => (
          <div key={idx} className="faq-item">
            <button className="faq-question" onClick={() => toggleFaq(idx)}>
              {faq.question} {openIndex === idx ? "▲" : "▼"}
            </button>

            {openIndex === idx && (
              <div className="faq-answer">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>

      {/* ---------- CONTACT FORM ---------- */}
      <h3 style={{ marginTop: "30px" }}>Contact Support</h3>

      {status === "success" && (
        <div
          style={{
            padding: "10px",
            background: "#c8e6c9",
            color: "#1b5e20",
            borderRadius: "6px",
            marginBottom: "12px",
            fontWeight: "600",
          }}
        >
          ✔ Your message has been sent!
        </div>
      )}

      {status === "error" && (
        <div
          style={{
            padding: "10px",
            background: "#ffcdd2",
            color: "#b71c1c",
            borderRadius: "6px",
            marginBottom: "12px",
            fontWeight: "600",
          }}
        >
          ⚠ Please fill all fields!
        </div>
      )}

      <form onSubmit={sendMessage} className="contact-form">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          className="input-box"
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          className="input-box"
        />

        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          className="input-box"
          rows="4"
        ></textarea>

        <button type="submit" className="btn-download" style={{ marginTop: "10px" }}>
          Send Message
        </button>
      </form>

      <p style={{ marginTop: "20px" }}>
        Or email directly:{" "}
        <a
          href="mailto:shankarrao4038@gmail.com"
          style={{
            fontWeight: "600",
            textDecoration: "underline",
            color: "#1a73e8",
          }}
        >
          shankarrao4038@gmail.com
        </a>
      </p>
    </div>
  );
}
