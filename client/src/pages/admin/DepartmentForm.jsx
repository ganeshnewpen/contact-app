// src/pages/admin/DepartmentForm.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  createDepartment,
  updateDepartment,
  getDepartments,
} from "../../services/departments";

const initialState = {
  name: "",
  description: "",
  head: "",
};


const DepartmentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [department, setDepartment] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchDepartment = async () => {
        try {
          const departments = await getDepartments();
          const dep = departments.find((d) => d._id === id);
          if (dep) {
            setDepartment({
              name: dep.name || "",
              description: dep.description || "",
              head: dep.head || "",
            });
          }
        } catch (err) {
          Swal.fire("Error", "Failed to load department.", "error");
        }
      };
      fetchDepartment();
    } else {
      setDepartment(initialState);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => setDepartment(initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (id) {
        await updateDepartment(id, department);
      } else {
        await createDepartment(department);
        resetForm();
      }

      Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        icon: "success",
        text: `Department ${id ? "updated" : "created"} successfully!`,
        timer: 2000,
      });

      // Navigate after success if needed
      navigate("/admin/departments");
    } catch (err) {
      Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        icon: "error",
        text: "Failed to save department.",
        timer: 2000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="page-title">{id ? "Edit" : "Create"} Department</h2>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Department Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={department.name}
            onChange={handleChange}
            placeholder="Enter department name"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows={3}
            value={department.description}
            onChange={handleChange}
            placeholder="Enter department description"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="head" className="form-label">Department Head</label>
          <input
            type="text"
            className="form-control"
            id="head"
            name="head"
            value={department.head}
            onChange={handleChange}
            placeholder="Enter head name"
          />
        </div>

        <div className="d-flex justify-content-start">
          <button
            type="button"
            className="btn btn-outline-secondary me-2"
            onClick={() => navigate("/admin/departments")}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {id ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DepartmentForm;
