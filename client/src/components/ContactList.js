import ContactCard from "./ContactCard";
import ContactForm from "./ContactForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPlus } from "@fortawesome/free-solid-svg-icons";

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
  const handleCancel = () => {
    setModalContact(null);
  };

  return (
    <div>
      <div className="mb-3 text-end">
        <button className="btn btn-outline-dark" onClick={onAddNew}>
          <FontAwesomeIcon icon={faPlus} /> Add New
        </button>
      </div>

      <div className="table-responsive">
        <table className="table contact-table">
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
            {contacts.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No contacts yet. Add your first contact!
                </td>
              </tr>
            ) : (
              contacts.map((contact) => (
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
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
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
