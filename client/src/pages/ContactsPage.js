import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../services/auth";
import {
  getContacts,
  addContact,
  updateContact,
  deleteContact,
} from "../services/contacts";
import ContactForm from "../components/ContactForm";
import ContactList from "../components/ContactList";

function ContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [viewingContact, setViewingContact] = useState(null);
  const [editingContact, setEditingContact] = useState(null);
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
      const data = await getContacts();
      setContacts(data);
    };
    fetchContacts();
  }, []);

  const handleSave = async (contactData) => {
    if (editingContact) {
      const updatedContact = await updateContact(
        editingContact.id,
        contactData
      );
      setContacts(
        contacts.map((c) => (c.id === updatedContact.id ? updatedContact : c))
      );
    } else {
      const newContact = await addContact(contactData);
      setContacts([...contacts, newContact.data]);
    }
    setEditingContact(null);
  };

  const handleView = (contact) => {
    setViewingContact(contact);
  };

  const handleDelete = async (id) => {
    console.log(id, "error, no id found!");
    await deleteContact(id);
    setContacts(contacts.filter((c) => c.id !== id));
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="contacts-page">
      <header>
        <h1>X-Contact</h1>
        <button className="btn btn-danger btn-sm" onClick={handleLogout}>Logout</button>
      </header>

      <div className="content">
        <h2>{editingContact ? "Edit Contact" : "Add New Contact"}</h2>
        <ContactForm
          initialContact={editingContact || {}}
          onSave={handleSave}
        />

        <h2 className="mt-4">Contacts ({contacts.length})</h2>

        <ContactList
          contacts={contacts}
          onView={handleView}
          onEdit={setEditingContact}
          onDelete={handleDelete}
        />

        {viewingContact && (
          <div
            className="modal fade show"
            style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
            tabIndex="-1"
            role="dialog"
            onClick={() => setViewingContact(null)}
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Contact Details</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setViewingContact(null)}
                  ></button>
                </div>
                <div className="modal-body text-center">
                  <img
                    src={
                      viewingContact.profileImage ||
                      "https://via.placeholder.com/100"
                    }
                    alt={viewingContact.name}
                    className="rounded-circle mb-3"
                    width="100"
                    height="100"
                  />
                  <p>
                    <strong>Name:</strong> {viewingContact.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {viewingContact.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {viewingContact.phone || "-"}
                  </p>
                  <p>
                    <strong>Post:</strong> {viewingContact.post || "-"}
                  </p>
                  <p>
                    <strong>Address:</strong> {viewingContact.address || "-"}
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setViewingContact(null)}
                  >
                    Close
                  </button>
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
