import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getContacts } from "../services/contacts";
import { format } from "date-fns";
import { FaSignOutAlt } from "react-icons/fa";
import { getCurrentUser, logout } from "../services/auth";
import { getGreeting } from "../utils/helpers";

const Dashboard = () => {
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await getContacts();
        // console.log("Fetched contacts:", data); // Debug: Inspect data
        setContacts(data);
      } catch (error) {
        console.error("Failed to fetch contacts:", error);
      }
    };
    fetchContacts();
  }, []);

  const today = new Date();
  const todayMonthDay = format(today, "MM-dd");

  const isValidDateFormat = (dateStr) => {
    if (typeof dateStr !== "string") return false;
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateStr)) return false;
    const date = new Date(dateStr);
    return !isNaN(date.getTime()) && dateStr === format(date, "yyyy-MM-dd");
  };

  const birthdayContacts = contacts.filter((contact) => {
    if (!contact.dob) {
      return false;
    }

    if (!isValidDateFormat(contact.dob)) {
      return false;
    }

    try {
      const dobDate = new Date(contact.dob);
      const dobMonthDay = format(dobDate, "MM-dd");
      return dobMonthDay === todayMonthDay;
    } catch (error) {
      console.warn(
        `Skipping contact ${contact.name || contact.id}: Error parsing dob`,
        contact.dob,
        error
      );
      return false;
    }
  });

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="container my-5">
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <div className="wrap">
          <h2 className="fw-bold">Dashboard</h2>
          <p>Welcome to Dashboard! {getGreeting("Admin")} </p>
        </div>

        <button className="btn btn-danger btn-sm" onClick={handleLogout}>
          <FaSignOutAlt size={18} /> Logout
        </button>
      </div>

      <div className="row g-4">
        {/* Total Contacts Card */}
        <div className="col-md-4">
          <Link to="/contacts" className="text-decoration-none">
            <div className="card border-0 bg-grad-dash text-white shadow-lg h-100 transition-hover">
              <div className="card-body d-flex flex-column justify-content-between">
                <h4 className="card-title fw-bold">Total Contacts</h4>
                <p className="display-6">{contacts.length}</p>
              </div>
            </div>
          </Link>
        </div>

        {/* birthdays... */}
        {birthdayContacts.length > 0 && (
          <div className="col-md-8">
            <div className="card shadow-lg h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="card-title fw-bold mb-0">
                    Today's Birthdays 🎉
                  </h5>
                  <span>Wish them a birthday!</span>
                </div>
                <ul className="list-group list-group-flush">
                  {birthdayContacts.map((contact) => {
                    if (!isValidDateFormat(contact.dob)) {
                      console.error(
                        `Invalid dob in render for ${
                          contact.name || contact.id
                        }:`,
                        contact.dob
                      );
                      return null;
                    }
                    return (
                      <li
                        key={contact.id}
                        className="list-group-item d-flex justify-content-between align-items-center transition-hover"
                      >
                        <Link
                          to="/contacts"
                          className="text-decoration-none text-dark"
                        >
                          <span>{contact.name}</span>
                          {contact.post && (
                            <span className="text-muted ms-2">
                              ({contact.post})
                            </span>
                          )}
                        </Link>
                        <span className="badge bg-success fw-normal rounded-pill">
                          {format(new Date(contact.dob), "MMMM d")}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
