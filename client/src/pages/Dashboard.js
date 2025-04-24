import React from "react";

const Dashboard = () => {
  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">📊 Contact Dashboard</h2>
        <button className="btn btn-success">
          + Add New Contact
        </button>
      </div>

      <div className="row g-4">
        <div className="col-md-4">
          <div className="card bg-primary text-white shadow">
            <div className="card-body">
              <h5 className="card-title">Total Contacts</h5>
              <p className="display-6">100</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-info text-white shadow">
            <div className="card-body">
              <h5 className="card-title">With Email</h5>
              <p className="display-6">87</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-warning text-white shadow">
            <div className="card-body">
              <h5 className="card-title">Without Phone</h5>
              <p className="display-6">13</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div className="card shadow">
          <div className="card-body text-center">
            <p className="text-muted">📈 Overview Chart Placeholder</p>
            <div style={{ height: "200px", background: "#e9ecef" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
