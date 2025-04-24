import { useState, useEffect } from "react";

function ContactForm({ initialContact = {}, onSave }) {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    post: "",
    profileImage: "",
  });

  useEffect(() => {
    setContact({
      name: initialContact.name || "",
      email: initialContact.email || "",
      phone: initialContact.phone || "",
      address: initialContact.address || "",
      post: initialContact.post || "",
      profileImage: initialContact.profileImage || "",
    });
  }, [initialContact]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(contact);
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border rounded bg-light">
      <div className="row">
        <div className="mb-3 col-lg-12">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={contact.name}
            onChange={handleChange}
            placeholder="Enter name"
            required
          />
        </div>

        <div className="mb-3 col-lg-6">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={contact.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />
        </div>

        <div className="mb-3 col-lg-6">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            name="phone"
            value={contact.phone}
            onChange={handleChange}
            placeholder="Enter phone"
          />
        </div>

        <div className="mb-3 col-lg-6">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={contact.address}
            onChange={handleChange}
            placeholder="Enter address"
          />
        </div>

        <div className="mb-3 col-lg-6">
          <label htmlFor="post" className="form-label">
            Job Title
          </label>
          <input
            type="text"
            className="form-control"
            id="post"
            name="post"
            value={contact.post}
            onChange={handleChange}
            placeholder="Enter job title"
          />
        </div>

        <div className="mb-3 col-lg-6">
          <label htmlFor="profileImage" className="form-label">
            Profile Image URL
          </label>
          <input
            type="url"
            className="form-control"
            id="profileImage"
            name="profileImage"
            value={contact.profileImage}
            onChange={handleChange}
            placeholder="Enter image URL"
          />
        </div>
      </div>

      <button type="submit" className="btn btn-dark">
        {initialContact.id ? "Update" : "Add"} Contact
      </button>
    </form>
  );
}

export default ContactForm;
