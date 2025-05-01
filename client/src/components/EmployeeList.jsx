import { useState } from "react";
import ContactCard from "./EmployeeCard";
import ContactForm from "./ContactForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import EmployeeCard from "./EmployeeCard";

function EmployeeList({
  employees,
  onView,
  onEdit,
  onDelete,
  onAddNew,
  modalEmployee,
  setModalEmployee,
  onSave,
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleCancel = () => {
    setModalEmployee(null);
  };

  // const filteredEmployees = employees?.filter((contact) => {
  //   const query = searchQuery.toLowerCase();
  //   return (
  //     (contact.name?.toLowerCase() || "").includes(query) ||
  //     (contact.email?.toLowerCase() || "").includes(query) ||
  //     (contact.phone?.toLowerCase() || "").includes(query) ||
  //     (contact.post?.toLowerCase() || "").includes(query) ||
  //     (contact.address?.toLowerCase() || "").includes(query)
  //   );
  // });

  const filteredEmployees = Array.isArray(employees)
    ? employees.filter((contact) => {
      const query = searchQuery.toLowerCase();
      return (
        (contact.name?.toLowerCase() || "").includes(query) ||
        (contact.email?.toLowerCase() || "").includes(query) ||
        (contact.phone?.toLowerCase() || "").includes(query) ||
        (contact.post?.toLowerCase() || "").includes(query) ||
        (contact.address?.toLowerCase() || "").includes(query)
      );
    })
    : [];


  return (
    <div className="container">
      <div className="mb-3 d-flex justify-content-between">
        <h1 className="page-title mb-0">Employees ({employees.length})</h1>
        <button className="btn btn-outline-dark mb-auto" onClick={onAddNew}>
          <FontAwesomeIcon icon={faPlus} /> Add New
        </button>
      </div>
      <div className="d-flex justify-content-end">
        <div className="input-group" style={{ width: "fit-content" }}>
          <span className="input-group-text">
            <FontAwesomeIcon icon={faSearch} />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search employees..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-hover table-bordered contact-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Post</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  {searchQuery
                    ? "No employees match your search."
                    : "No employees yet. Add your first employee!"}
                </td>
              </tr>
            ) : (
              filteredEmployees.map((employee) => (
                <EmployeeCard
                  key={employee.id}
                  employee={employee}
                  onView={onView}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {modalEmployee !== null && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
          role="dialog"
          onClick={handleCancel}
        >
          <div
            className="modal-dialog modal-lg modal-dialog-centered"
            role="document"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {modalEmployee.id ? "Edit Employee" : "Add New Employee"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCancel}
                ></button>
              </div>
              <div className="modal-body">
                <ContactForm
                  ic={modalEmployee}
                  onSave={onSave}
                  onCancel={handleCancel}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeList;
