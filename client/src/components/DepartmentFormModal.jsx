import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { createDepartment } from "../services/departments";

const DepartmentFormModal = ({ show, handleClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        head: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const newDepartment = await createDepartment(formData);
            onSuccess(newDepartment); // refresh list
            handleClose();
            setFormData({ name: "", description: "", head: "" });
        } catch (err) {
            setError("Failed to create department");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add Department</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    {error && <div className="text-danger mb-2">{error}</div>}
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter department name"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Optional description"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Head</Form.Label>
                        <Form.Control
                            name="head"
                            value={formData.head}
                            onChange={handleChange}
                            placeholder="Department head"
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} disabled={loading}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit" disabled={loading}>
                        {loading ? "Saving..." : "Save"}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default DepartmentFormModal;
