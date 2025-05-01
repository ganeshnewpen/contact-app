import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../../services/auth";
import {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "../../services/employees";
import EmployeeList from "../../components/EmployeeList";
import EmployeeModal from "../../components/EmployeeModal";
import { getStringAvatar } from "../../utils/helpers";

export default function EmployeesList() {
  const [employees, setEmployees] = useState([]);
  const [viewingEmployee, setViewingEmployee] = useState(null);
  const [modalEmployee, setModalEmployee] = useState(null);
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();
  console.log(viewingEmployee);

  // Check auth
  useEffect(() => {
    if (!getCurrentUser()) {
      navigate("/login");
    }
  }, [navigate]);

  // Load employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getEmployees();
        console.log("featched employees", data);
        setEmployees(data);
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  useEffect(() => {
    setImageError(false);
  }, [viewingEmployee]);

  const handleSave = async (employeeData) => {
    try {
      if (modalEmployee?.id) {
        const updatedEmployee = await updateEmployee(
          modalEmployee.id,
          employeeData
        );
        setEmployees(
          employees.map((c) => (c.id === updatedEmployee.id ? updatedEmployee : c))
        );
        return updatedEmployee;
      } else {
        const newEmployee = await addEmployee(employeeData);
        setEmployees([newEmployee.data, ...employees]);
        return newEmployee;
      }
    } catch (error) {
      console.error("Failed to save employee:", error);
      throw error;
    } finally {
      setModalEmployee(null); // Close modal
    }
  };

  const handleView = (employee) => {
    setViewingEmployee(employee);
  };

  const handleEdit = (employee) => {
    setModalEmployee(employee); // Open modal for editing
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await deleteEmployee(id);
        setEmployees(employees.filter((c) => c.id !== id));
      } catch (error) {
        console.error("Failed to delete employee:", error);
      }
    }
  };

  const handleAddNew = () => {
    setModalEmployee({}); // Open modal for new employee
  };

  return (
    <div className="employees-page">
      <div className="content">
        <EmployeeList
          employees={employees}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAddNew={handleAddNew}
          modalEmployee={modalEmployee}
          setModalEmployee={setModalEmployee}
          onSave={handleSave}
        />
        <EmployeeModal
          employee={viewingEmployee}
          onClose={() => setViewingEmployee(null)}
          imageError={imageError}
          setImageError={setImageError}
          getStringAvatar={getStringAvatar}
        />
      </div>
    </div>
  );
}