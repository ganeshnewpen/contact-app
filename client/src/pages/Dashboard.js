import { useState, useEffect } from "react";import { Navigate } from "react-router-dom";
import ContactsPage from "./ContactsPage";
import { Link } from "react-router-dom";

import { getContacts } from "../services/contacts";

const Dashboard = () => {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await getContacts();
        setContacts(data);
      } catch (error) {
        console.error("Failed to fetch contacts:", error);
      }
    };
    fetchContacts();
  }, []);
  return (
    <div className="container my-5">
      <div className="mb-4">
        <h2 className="fw-bold">📊 Contact Dashboard</h2>
      </div>

      <div className="row g-4">
        <div className="col-md-4">
          <Link to="/contacts" className="text-decoration-none">
            <div className="card bg-primary text-white shadow">
              <div className="card-body">
                <h5 className="card-title">Total Contacts</h5>
                <p className="display-6">100</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
