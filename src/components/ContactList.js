import ContactCard from './ContactCard';

function ContactList({ contacts, onEdit, onDelete }) {
  return (
    <table className="contact-table">
      {contacts.length === 0 ? (
        <p>No contacts yet. Add your first contact!</p>
      ) : (
        contacts.map(contact => (
          <ContactCard
            key={contact.id}
            contact={contact}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      )}
    </table>
  );
}

export default ContactList;