// src/pages/admin/DepartmentForm.jsx
import { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { 
  createDepartment, 
  updateDepartment,
  getDepartments
} from "../../services/departments";

const DepartmentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    head: ""
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      const fetchDepartment = async () => {
        try {
          const departments = await getDepartments();
          const department = departments.find(d => d._id === id);
          if (department) {
            setFormData({
              name: department.name,
              description: department.description,
              head: department.head
            });
          }
        } catch (err) {
          console.log(err);
          setError("Failed to load department");
        }
      };
      fetchDepartment();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateDepartment(id, formData);
      } else {
        await createDepartment(formData);
      }
      navigate("/admin/departments");
    } catch (err) {
      setError(err.response?.data?.message || "Operation failed");
    }
  };

  return (
    <div className="container my-4">
      <h2>{id ? "Edit" : "Create"} Department</h2>
      
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Head</Form.Label>
          <Form.Control
            type="text"
            value={formData.head}
            onChange={(e) => setFormData({...formData, head: e.target.value})}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          {id ? "Update" : "Create"}
        </Button>
      </Form>
    </div>
  );
};

export default DepartmentForm;