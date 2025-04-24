function ContactCard({ contact, onEdit, onDelete }) {
    return (
      <tr className="contact-row">
        <td className="contact-image-cell">
          <img 
            src={contact.profileImage || 'https://via.placeholder.com/50'} 
            alt={contact.name}
            className="contact-avatar"
          />
        </td>
        <td>{contact.name}</td>
        <td>{contact.email}</td>
        <td>{contact.phone || '-'}</td>
        <td>{contact.post || '-'}</td>
        <td>{contact.address || '-'}</td>
        <td className="contact-actions-cell">
          <button onClick={() => onEdit(contact)}>Edit</button>
          <button onClick={() => onDelete(contact.id)}>Delete</button>
        </td>
      </tr>
    );
  }
  export default ContactCard;
