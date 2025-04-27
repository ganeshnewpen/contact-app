import { FaLinkedin, FaGithub, FaDiscord, FaArrowCircleLeft } from "react-icons/fa";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../services/auth";
import {
  getContacts,
  addContact,
  updateContact,
  deleteContact,
} from "../services/contacts";
import ContactList from "../components/ContactList";
import { getStringAvatar } from "../utils/helpers";
import { format } from "date-fns";
import { Link } from "react-router-dom";

function ContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [viewingContact, setViewingContact] = useState(null);
  const [modalContact, setModalContact] = useState(null); // Controls modal (null, new, or editing contact)
  const [imageError, setImageError] = useState(false); // Track image loading errors
  const navigate = useNavigate();

  // Check auth
  useEffect(() => {
    if (!getCurrentUser()) {
      navigate("/login");
    }
  }, [navigate]);

  // Load contacts
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await getContacts();
        setContacts(data);
      } catch (error) {
        console.error("Failed to fetch contacts:", error);
      }
    };
    fetchContacts();
  }, []);

  useEffect(() => {
    setImageError(false);
  }, [viewingContact]);

  const handleSave = async (contactData) => {
    try {
      if (modalContact?.id) {
        const updatedContact = await updateContact(
          modalContact.id,
          contactData
        );
        setContacts(
          contacts.map((c) => (c.id === updatedContact.id ? updatedContact : c))
        );
        return updatedContact;
      } else {
        const newContact = await addContact(contactData);
        setContacts([newContact.data, ...contacts]);
        return newContact;
      }
    } catch (error) {
      console.error("Failed to save contact:", error);
      throw error;
    } finally {
      setModalContact(null); // Close modal
    }
  };

  const handleView = (contact) => {
    setViewingContact(contact);
  };

  const handleEdit = (contact) => {
    setModalContact(contact); // Open modal for editing
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        await deleteContact(id);
        setContacts(contacts.filter((c) => c.id !== id));
      } catch (error) {
        console.error("Failed to delete contact:", error);
      }
    }
  };

  const handleAddNew = () => {
    setModalContact({}); // Open modal for new contact
  };

  return (
    <div className="contacts-page">
      <header className="flex-column align-items-start gap-3">
        <Link to="/dashboard" className="text-decoration-none text-reset">
        <FaArrowCircleLeft size={24} />
        </Link>
        <h1 className="fs-4 fw-bold">Contact Lists ({contacts.length})</h1>
      </header>
    
      <div className="content">
        <ContactList
          contacts={contacts}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAddNew={handleAddNew}
          modalContact={modalContact}
          setModalContact={setModalContact}
          onSave={handleSave}
        />

        {viewingContact && (
          <div
            className="modal fade show"
            style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
            tabIndex="-1"
            role="dialog"
            aria-labelledby="contactModalLabel"
            aria-hidden="false"
            onClick={() => setViewingContact(null)}
          >
            <div
              className="modal-dialog modal-dialog-centered"
              role="document"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content shadow-lg border-0">
                <div className="modal-header bg-light border-bottom">
                  <h5 className="modal-title fw-bold" id="contactModalLabel">
                    Contact Details
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setViewingContact(null)}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body p-4 text-center">
                  {viewingContact.profileImage && !imageError ? (
                    <img
                      src={viewingContact.profileImage}
                      alt={viewingContact.name}
                      className="rounded-circle mb-3 border"
                      width="100"
                      height="100"
                      style={{ objectFit: "cover" }}
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div
                      className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center mx-auto mb-3 border fw-bold"
                      style={{
                        width: "80px",
                        height: "80px",
                        fontSize: "32px",
                      }}
                    >
                      {getStringAvatar(viewingContact.name)}
                    </div>
                  )}
                  <h5 className="fw-semibold">{viewingContact.name}</h5>

                  <p className="mt-2 mb-0 text-muted">
                    Joined Date:{" "}
                    {viewingContact.joinedDate
                      ? format(
                          new Date(viewingContact.joinedDate),
                          "MMMM d, yyyy"
                        )
                      : "-"}
                  </p>

                  <div className="d-flex flex-wrap justify-content-center gap-3 mb-3 mt-3">
                    {viewingContact.linkedinProfile && (
                      <a
                        href={viewingContact.linkedinProfile}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="LinkedIn Profile"
                        className="text-primary"
                      >
                        <FaLinkedin size={24} />
                      </a>
                    )}
                    {viewingContact.githubProfile && (
                      <a
                        href={viewingContact.githubProfile}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="GitHub Profile"
                        className="text-dark"
                      >
                        <FaGithub size={24} />
                      </a>
                    )}
                    {viewingContact.discordProfile && (
                      <a
                        href={viewingContact.discordProfile}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Discord Profile"
                        className="text-info"
                      >
                        <FaDiscord size={24} />
                      </a>
                    )}
                  </div>
                  <div className="text-start mt-3 border-top pt-3">
                    <p className="mb-2">
                      <strong>Post / Designation:</strong>{" "}
                      {viewingContact.post || "—"}
                    </p>

                    <p className="mb-2">
                      <strong>Email:</strong>{" "}
                      <a
                        href={`mailto:${viewingContact.email}`}
                        className="text-decoration-none"
                      >
                        {viewingContact.email}
                      </a>
                    </p>
                    <p className="mb-2">
                      <strong>Phone:</strong> {viewingContact.phone || "—"}
                    </p>
                    <p className="mb-2">
                      <strong>Address:</strong> {viewingContact.address || "—"}
                    </p>
                    {(viewingContact.emergencyContactName ||
                      viewingContact.emergencyContactNumber) && (
                      <div className="mt-3">
                        <strong>Emergency Contact Person:</strong>
                        <p className="mb-2 mt-2">
                          <strong>Name:</strong>{" "}
                          {viewingContact.emergencyContactName || "—"}
                        </p>
                        <p className="mb-2">
                          <strong>Phone:</strong>
                          &nbsp;{" "}
                          <a
                            href={`tel:${viewingContact.emergencyContactNumber}`}
                            className="text-decoration-none"
                          >
                            {viewingContact.emergencyContactNumber}
                          </a>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContactsPage;
