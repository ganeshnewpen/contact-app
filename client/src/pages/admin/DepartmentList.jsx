// src/pages/admin/DepartmentList.jsx
import { useEffect, useState } from "react";
import { Table, Button, Alert } from "react-bootstrap";
import { getDepartments, deleteDepartment } from "../../services/departments";
import { Link } from "react-router-dom";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await getDepartments();
        setDepartments(data);
      } catch (err) {
        setError("Failed to load departments");
      }
    };
    fetchDepartments();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDepartment(id);
      setDepartments(departments.filter(dept => dept._id !== id));
    } catch (err) {
      setError("Failed to delete department");
    }
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between mb-4">
        <h2>Departments</h2>
        <Button as={Link} to="/admin/departments/new" variant="primary">
          Add Department
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Head</th>
            <th>Employees</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dept) => (
            <tr key={dept._id}>
              <td>{dept.name}</td>
              <td>{dept.head}</td>
              <td>{dept.employees?.length || 0}</td>
              <td>
                <Button
                  as={Link}
                  to={`/admin/departments/edit/${dept._id}`}
                  variant="info"
                  size="sm"
                  className="me-2"
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(dept._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DepartmentList;