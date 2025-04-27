import { useState, useEffect } from "react";
import Swal from "sweetalert2";

function ContactForm({ ic = {}, onSave, onCancel }) {
  const initialState = {
    name: "",
    email: "",
    phone: "",
    address: "",
    post: "",
    joinedDate: "",
    profileImage: "",
    discordProfile: "",
    githubProfile: "",
    linkedinProfile: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
  };

  const [contact, setContact] = useState({
    name: ic.name || "",
    email: ic.email || "",
    phone: ic.phone || "",
    address: ic.address || "",
    post: ic.post || "",
    joinedDate: ic.joinedDate || "",
    profileImage: ic.profileImage || "",
    discordProfile: ic.discordProfile || "",
    githubProfile: ic.githubProfile || "",
    linkedinProfile: ic.linkedinProfile || "",
    emergencyContactName: ic.emergencyContactName || "",
    emergencyContactNumber: ic.emergencyContactNumber || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when ic changes (e.g., new/edit modal opens)
  useEffect(() => {
    setContact({
      name: ic.name || "",
      email: ic.email || "",
      phone: ic.phone || "",
      address: ic.address || "",
      post: ic.post || "",
      joinedDate: ic.joinedDate || "",
      profileImage: ic.profileImage || "",
      discordProfile: ic.discordProfile || "",
      githubProfile: ic.githubProfile || "",
      linkedinProfile: ic.linkedinProfile || "",
      emergencyContactName: ic.emergencyContactName || "",
      emergencyContactNumber: ic.emergencyContactNumber || "",
    });
  }, [ic]);

  const resetForm = () => {
    setContact(initialState);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSave(contact);
      resetForm();
      Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        // title: "Success!",
        text: `Contact ${ic.id ? "updated" : "added"} successfully!`,
        icon: "success",
        confirmButtonColor: "#3085d6",
        timer: 2000,
      });
    } catch (error) {
      Swal.fire({
        toast: true,
        position: "top-end",
        // title: "Error!",
        showConfirmButton: false,
        text: "Failed to save contact.",
        icon: "error",
        confirmButtonColor: "#d33",
        timer: 2000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="p-3 border rounded bg-light form-ui"
      >
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
              required
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
              required
            />
          </div>

          <div className="mb-3 col-lg-6">
            <label htmlFor="post" className="form-label">
              Position
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
            <label htmlFor="joinedDate" className="form-label">
              Joined Date
            </label>
            <input
              type="date"
              className="form-control"
              id="joinedDate"
              name="joinedDate"
              value={contact.joinedDate}
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

          <div className="mb-3 col-lg-6">
            <label htmlFor="discordProfile" className="form-label">
              Discord URL
            </label>
            <input
              type="url"
              className="form-control"
              id="discordProfile"
              name="discordProfile"
              value={contact.discordProfile}
              onChange={handleChange}
              placeholder="Enter discord URL"
            />
          </div>

          <div className="mb-3 col-lg-6">
            <label htmlFor="linkedinProfile" className="form-label">
              LinkedIn Profile URL
            </label>
            <input
              type="url"
              className="form-control"
              id="linkedinProfile"
              name="linkedinProfile"
              value={contact.linkedinProfile}
              onChange={handleChange}
              placeholder="Enter linkedin URL"
            />
          </div>

          <div className="mb-3 col-lg-6">
            <label htmlFor="githubProfile" className="form-label">
              GitHub URL
            </label>
            <input
              type="url"
              className="form-control"
              id="githubProfile"
              name="githubProfile"
              value={contact.githubProfile}
              onChange={handleChange}
              placeholder="Enter github URL"
            />
          </div>

          <div className="mb-3 mt-3 col-lg-12">
            <span className="badge bg-primary d-inline-block mb-2">
              Contact Person
            </span>
            <div className="row">
              <div className="mb-3 col-lg-6">
                <label htmlFor="emergencyContactName" className="form-label">
                  Contact Person Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="emergencyContactName"
                  name="emergencyContactName"
                  value={contact.emergencyContactName}
                  onChange={handleChange}
                  placeholder="Enter emergency contact name"
                />
              </div>

              <div className="mb-3 col-lg-6">
                <label htmlFor="emergencyContactNumber" className="form-label">
                  Contact Person Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="emergencyContactNumber"
                  name="emergencyContactNumber"
                  value={contact.emergencyContactNumber}
                  onChange={handleChange}
                  placeholder="Enter emergency contact phone"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-secondary me-2"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-dark"
            disabled={isSubmitting}
          >
            {ic.id ? "Update" : "Add"} Contact
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
