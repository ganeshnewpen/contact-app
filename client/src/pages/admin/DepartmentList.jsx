// src/pages/admin/DepartmentList.jsx
import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { getDepartments, deleteDepartment } from "../../services/departments";
import DepartmentFormModal from "../../components/DepartmentFormModal";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Fetch departments on component mount
  useEffect(() => {
    const loadDepartments = async () => {
      try {
        const data = await getDepartments();
        setDepartments(data);
      } catch (err) {
        Swal.fire("Error", "Failed to load departments.", "error");
      }
    };
    loadDepartments();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone. Deleting the department will remove all associated employees.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!"
    });

    if (result.isConfirmed) {
      try {
        await deleteDepartment(id);
        setDepartments((prev) => prev.filter((dept) => dept.id !== id));
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Deleted!",
          text: "The department has been deleted.",
          showConfirmButton: false,
          timer: 1500
        });
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to delete department."
        });
      }
    }
  };

  const handleAddSuccess = async () => {
    try {
      const departments = await getDepartments();
      setDepartments(departments);
    } catch (error) {
      console.error("Failed to fetch departments:", error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-4">
        <h2 className="page-title">Departments</h2>
        <Button variant="outline-dark" onClick={() => setShowModal(true)}>
          Add Department
        </Button>
      </div>

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
            <tr key={dept.id}>
              <td>{dept.name}</td>
              <td>{dept.head}</td>
              <td>{dept.employeeCount || 0}</td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  className="me-2"
                  disabled
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(dept.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for adding a new department */}
      <DepartmentFormModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        onSuccess={handleAddSuccess}
      />
    </div>
  );
};

export default DepartmentList;
