// src/pages/Settings.jsx
import { useState } from "react";

export default function Settings() {
  // Profile
  const [name, setName] = useState("Shankar");
  const [email, setEmail] = useState("shankarrao4038@gmail.com");
  const [avatar, setAvatar] = useState(null);

  // Notifications
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [notifFrequency, setNotifFrequency] = useState("daily");

  // Security
  const [password, setPassword] = useState("");
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);

  // UI / Theme
  const [theme, setTheme] = useState("light");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Data Preferences
  const [defaultSort, setDefaultSort] = useState("name");
  const [exportFormat, setExportFormat] = useState("excel");

  // Confirmation message
  const [saveMsg, setSaveMsg] = useState("");

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file ? URL.createObjectURL(file) : null);
  };

  const handleSave = () => {
    // Simulate save (can integrate backend later)
    setSaveMsg("Settings saved successfully!");
    setTimeout(() => setSaveMsg(""), 2500);
  };

  return (
    <div className="page-card settings-page">
      <h2 className="page-title">Settings</h2>

      {/* Profile Section */}
      <section className="settings-section">
        <h3>Profile</h3>
        <div className="form-row">
          <label>Name:</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-row">
          <label>Email:</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-row">
          <label>Avatar:</label>
          <input type="file" accept="image/*" onChange={handleAvatarChange} />
          {avatar && <img src={avatar} alt="avatar" className="avatar-preview" />}
        </div>
      </section>

      {/* Notifications Section */}
      <section className="settings-section">
        <h3>Notifications</h3>
        <div className="form-row toggle-row">
          <label>Enable Notifications:</label>
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={() => setNotificationsEnabled(!notificationsEnabled)}
          />
        </div>
        <div className="form-row">
          <label>Frequency:</label>
          <select value={notifFrequency} onChange={(e) => setNotifFrequency(e.target.value)}>
            <option value="immediate">Immediate</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>
      </section>

      {/* Security Section */}
      <section className="settings-section">
        <h3>Security</h3>
        <div className="form-row">
          <label>Change Password:</label>
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-row toggle-row">
          <label>Two-Factor Authentication:</label>
          <input
            type="checkbox"
            checked={twoFAEnabled}
            onChange={() => setTwoFAEnabled(!twoFAEnabled)}
          />
        </div>
      </section>

      {/* UI / Theme Section */}
      <section className="settings-section">
        <h3>UI / Theme</h3>
        <div className="form-row">
          <label>Theme:</label>
          <select value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        <div className="form-row toggle-row">
          <label>Sidebar Collapsed:</label>
          <input
            type="checkbox"
            checked={sidebarCollapsed}
            onChange={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
        </div>
      </section>

      {/* Data / Export Section */}
      <section className="settings-section">
        <h3>Data Preferences</h3>
        <div className="form-row">
          <label>Default Sort:</label>
          <select value={defaultSort} onChange={(e) => setDefaultSort(e.target.value)}>
            <option value="name">Name</option>
            <option value="department">Department</option>
            <option value="salary">Salary</option>
          </select>
        </div>
        <div className="form-row">
          <label>Export Format:</label>
          <select value={exportFormat} onChange={(e) => setExportFormat(e.target.value)}>
            <option value="excel">Excel</option>
            <option value="csv">CSV</option>
            <option value="pdf">PDF</option>
          </select>
        </div>
      </section>

      {/* Save Button & Confirmation */}
      <div style={{ marginTop: "20px" }}>
        <button className="btn-save" onClick={handleSave}>Save Settings</button>
        {saveMsg && <p style={{ color: "green", fontWeight: 500, marginTop: "10px" }}>{saveMsg}</p>}
      </div>
    </div>
  );
}
