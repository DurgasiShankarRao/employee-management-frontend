import { useState } from "react";
import { createEmployee } from "../api/api";
import { toast } from "react-toastify";

function AddEmployee() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    position: "",
    department: "",
    salary: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createEmployee(formData);
      toast.success("Employee added successfully!");

      setFormData({
        name: "",
        email: "",
        position: "",
        department: "",
        salary: "",
      });
    } catch (error) {
      console.error("Error creating employee:", error);
      toast.error("Failed to add employee");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-employee-container">
      {/* ❌ Removed the duplicate <h2> */}
      
      <form className="employee-form" onSubmit={handleSubmit}>

        <input
          className="form-input"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          className="form-input"
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          className="form-input"
          name="position"
          placeholder="Position"
          value={formData.position}
          onChange={handleChange}
        />

        <input
          className="form-input"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
        />

        <input
          className="form-input"
          name="salary"
          type="number"
          placeholder="Salary"
          value={formData.salary}
          onChange={handleChange}
        />

        <button className="form-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Add Employee"}
        </button>
      </form>
    </div>
  );
}

export default AddEmployee;
