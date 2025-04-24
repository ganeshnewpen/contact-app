import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../services/auth';
import { getContacts, addContact, updateContact, deleteContact } from '../services/contacts';
import ContactForm from '../components/ContactForm';
import ContactList from '../components/ContactList';

function ContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);
  const navigate = useNavigate();

  // Check auth
  useEffect(() => {
    if (!getCurrentUser()) {
      navigate('/login');
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
      const updatedContact = await updateContact(editingContact.id, contactData);
      setContacts(contacts.map(c => (c.id === updatedContact.id ? updatedContact : c)));
    } else {
      const newContact = await addContact(contactData);
      setContacts([...contacts, newContact]);
    }
    setEditingContact(null);
  };

  const handleDelete = async (id) => {
    await deleteContact(id);
    setContacts(contacts.filter(c => c.id !== id));
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="contacts-page">
      <header>
        <h1>X-Contact</h1>
        <button onClick={handleLogout}>Logout</button>
      </header>
      
      <div className="content">
        <h2>{editingContact ? 'Edit Contact' : 'Add New Contact'}</h2>
        <ContactForm 
          initialContact={editingContact || {}}
          onSave={handleSave}
        />
        
        <h2 className="mt-4">Your Contacts ({contacts.length})</h2>
        <ContactList
          contacts={contacts}
          onEdit={setEditingContact}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default ContactsPage;