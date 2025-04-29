import React from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { getCurrentUser } from './services/auth';
import LoginPage from './pages/LoginPage';
import ContactsPage from './pages/ContactsPage';
import Dashboard from './pages/admin/Dashboard';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/admin/dashboard"
            element={
              getCurrentUser() ? <Dashboard /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/contacts"
            element={
              getCurrentUser() ? <ContactsPage /> : <Navigate to="/login" />
            }
          />
          <Route path="*" element={<Navigate to="/admin/dashboard" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}