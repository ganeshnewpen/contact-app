import { useState } from "react";
import ContactCard from "./ContactCard";
import ContactForm from "./ContactForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";

function ContactList({
  contacts,
  onView,
  onEdit,
  onDelete,
  onAddNew,
  modalContact,
  setModalContact,
  onSave,
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleCancel = () => {
    setModalContact(null);
  };

  // Filter contacts based on search query
  const filteredContacts = contacts.filter((contact) => {
    const query = searchQuery.toLowerCase();
    return (
      (contact.name?.toLowerCase() || "").includes(query) ||
      (contact.email?.toLowerCase() || "").includes(query) ||
      (contact.phone?.toLowerCase() || "").includes(query) ||
      (contact.post?.toLowerCase() || "").includes(query) ||
      (contact.address?.toLowerCase() || "").includes(query)
    );
  });

  return (
    <div>
      <div className="mb-3 d-flex justify-content-end align-items-center">
        <button className="btn btn-outline-dark" onClick={onAddNew}>
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
            placeholder="Search contacts..."
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
            {filteredContacts.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  {searchQuery
                    ? "No contacts match your search."
                    : "No contacts yet. Add your first contact!"}
                </td>
              </tr>
            ) : (
              filteredContacts.map((contact) => (
                <ContactCard
                  key={contact.id}
                  contact={contact}
                  onView={onView}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {modalContact !== null && (
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
                  {modalContact.id ? "Edit Contact" : "Add New Contact"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCancel}
                ></button>
              </div>
              <div className="modal-body">
                <ContactForm
                  ic={modalContact}
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

export default ContactList;
