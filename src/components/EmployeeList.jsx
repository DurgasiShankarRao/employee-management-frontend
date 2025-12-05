import { useEffect, useState } from "react";
import { getEmployees, deleteEmployee, updateEmployee } from "../api/api";
import { toast } from "react-toastify";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [editData, setEditData] = useState({
    name: "",
    email: "",
    position: "",
    department: "",
    salary: "",
  });

  // ⭐ Sorting State
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  // ⭐ Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Show 5 per page

  // Load employees
  const loadEmployees = async () => {
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (error) {
      toast.error("Failed to load employees");
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  // ⭐ Sorting Handler
  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // Sorting logic
  const sortedEmployees = [...employees].sort((a, b) => {
    if (!sortField) return 0;

    let valA = a[sortField];
    let valB = b[sortField];

    if (sortField === "salary") {
      valA = Number(valA);
      valB = Number(valB);
    } else {
      valA = valA.toLowerCase();
      valB = valB.toLowerCase();
    }

    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // ⭐ Search Filter
  const filteredEmployees = sortedEmployees.filter((emp) => {
    const text =
      `${emp.name} ${emp.email} ${emp.position} ${emp.department} ${emp.salary}`.toLowerCase();
    return text.includes(searchText.toLowerCase());
  });

  // ⭐ Pagination Logic
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEmployees = filteredEmployees.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Edit Handlers
  const handleEditClick = (emp) => {
    setEditingId(emp._id);
    setEditData({
      name: emp.name,
      email: emp.email,
      position: emp.position,
      department: emp.department,
      salary: emp.salary,
    });
  };

  const handleChange = (e) =>
    setEditData({ ...editData, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateEmployee(editingId, editData);
      toast.success("Employee updated successfully!");
      setEditingId(null);
      loadEmployees();
    } catch {
      toast.error("Failed to update employee");
    }
  };

const handleDelete = async (id) => {
  // ✅ Confirmation popup
  const confirmed = window.confirm("Are you sure you want to delete this employee?");
  if (!confirmed) return; // Exit if user clicks Cancel

  try {
    await deleteEmployee(id);
    toast.success("Employee deleted successfully!");
    loadEmployees();
  } catch {
    toast.error("Failed to delete employee");
  }
};


  const handleCancel = () => setEditingId(null);

  const sortIcon = (field) => {
    if (sortField !== field) return "";
    return sortOrder === "asc" ? " ▲" : " ▼";
  };

  return (
    <div className="employee-list-container">
      <div className="list-header">
        <h2 className="list-title">Employee List</h2>

        <input
          type="text"
          className="search-input"
          placeholder="Search employees..."
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            setCurrentPage(1); // Reset page on search
          }}
        />
      </div>

      {paginatedEmployees.length === 0 ? (
        <p className="no-data">No matching employees found.</p>
      ) : (
        <>
          <table className="employee-table">
            <thead>
              <tr>
                <th onClick={() => handleSort("name")}>
                  Name{sortIcon("name")}
                </th>
                <th onClick={() => handleSort("email")}>
                  Email{sortIcon("email")}
                </th>
                <th onClick={() => handleSort("position")}>
                  Position{sortIcon("position")}
                </th>
                <th onClick={() => handleSort("department")}>
                  Department{sortIcon("department")}
                </th>
                <th onClick={() => handleSort("salary")}>
                  Salary{sortIcon("salary")}
                </th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {paginatedEmployees.map((emp) => (
                <tr key={emp._id}>
                  {editingId === emp._id ? (
                    <>
                      <td>
                        <input
                          className="edit-input"
                          type="text"
                          name="name"
                          value={editData.name}
                          onChange={handleChange}
                        />
                      </td>
                      <td>
                        <input
                          className="edit-input"
                          type="email"
                          name="email"
                          value={editData.email}
                          onChange={handleChange}
                        />
                      </td>
                      <td>
                        <input
                          className="edit-input"
                          type="text"
                          name="position"
                          value={editData.position}
                          onChange={handleChange}
                        />
                      </td>
                      <td>
                        <input
                          className="edit-input"
                          type="text"
                          name="department"
                          value={editData.department}
                          onChange={handleChange}
                        />
                      </td>
                      <td>
                        <input
                          className="edit-input"
                          type="number"
                          name="salary"
                          value={editData.salary}
                          onChange={handleChange}
                        />
                      </td>
                      <td className="action-buttons">
                        <button className="save-btn" onClick={handleUpdate}>
                          Save
                        </button>
                        <button className="cancel-btn" onClick={handleCancel}>
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{emp.name}</td>
                      <td>{emp.email}</td>
                      <td>{emp.position}</td>
                      <td>{emp.department}</td>
                      <td>{emp.salary}</td>
                      <td className="action-buttons">
                        <button
                          className="edit-btn"
                          onClick={() => handleEditClick(emp)}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(emp._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          {/* ⭐ Pagination UI */}
          <div className="pagination">
            <button
              className="page-btn"
              onClick={() => changePage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`page-number ${
                  currentPage === i + 1 ? "active" : ""
                }`}
                onClick={() => changePage(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              className="page-btn"
              onClick={() => changePage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default EmployeeList;