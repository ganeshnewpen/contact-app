import ContactCard from "./ContactCard";

function ContactList({ contacts, onView, onEdit, onDelete }) {
  return (
    <table className="contact-table">
      <thead>
        <tr>
          <th>Image</th>
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
  );
}
export default ContactList;
