// src/pages/EmployeeListPage.jsx
import EmployeeList from "../components/EmployeeList";

export default function EmployeeListPage({ refreshList }) {
  return (
    <div className="page-card">
      <h2 className="page-title">Employees</h2>
      <EmployeeList refreshList={refreshList} />
    </div>
  );
}
