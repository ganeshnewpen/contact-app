import { FaArrowCircleLeft } from "react-icons/fa";
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
import ContactModal from "../components/ContactModal";
import { getStringAvatar } from "../utils/helpers";
import { Link } from "react-router-dom";

export default function ContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [viewingContact, setViewingContact] = useState(null);
  const [modalContact, setModalContact] = useState(null); // Controls modal (null, new, or editing contact)
  const [imageError, setImageError] = useState(false); // Track image loading errors
  const navigate = useNavigate();
  console.log(viewingContact);

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
        console.log("featched contacts", data);
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
        <ContactModal
          contact={viewingContact}
          onClose={() => setViewingContact(null)}
          imageError={imageError}
          setImageError={setImageError}
          getStringAvatar={getStringAvatar}
        />
      </div>
    </div>
  );
}