import { useState } from 'react';

function ContactForm({ initialContact = {}, onSave }) {
  const [contact, setContact] = useState({
    name: initialContact.name || '',
    email: initialContact.email || '',
    phone: initialContact.phone || '',
    address: initialContact.address || '',
    post: initialContact.post || '',
    profileImage: initialContact.profileImage || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(contact);
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <input
        type="text"
        name="name"
        value={contact.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        type="email"
        name="email"
        value={contact.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="tel"
        name="phone"
        value={contact.phone}
        onChange={handleChange}
        placeholder="Phone"
      />
      <input
        type="text"
        name="address"
        value={contact.address}
        onChange={handleChange}
        placeholder="Address"
      />
      <input
        type="text"
        name="post"
        value={contact.post}
        onChange={handleChange}
        placeholder="Job Title"
      />
      <input
        type="url"
        name="profileImage"
        value={contact.profileImage}
        onChange={handleChange}
        placeholder="Profile Image URL"
      />
      <button type="submit">
        {initialContact.id ? 'Update' : 'Add'} Contact
      </button>
    </form>
  );
}

export default ContactForm;