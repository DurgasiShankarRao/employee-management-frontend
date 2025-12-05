// src/pages/AddEmployeePage.jsx
import AddEmployee from "../components/AddEmployee";

export default function AddEmployeePage({ refreshList }) {
  return (
    <div className="page-card">
      <h2 className="page-title">Add Employee</h2>
      {/* safe even if AddEmployee ignores the prop */}
      <AddEmployee refreshList={refreshList} />
    </div>
  );
}