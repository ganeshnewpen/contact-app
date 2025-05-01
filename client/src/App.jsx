// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { getCurrentUser } from './services/auth';
import MainLayout from './layouts/MainLayout';
import LoginPage from './pages/LoginPage';
import EmployeesList from './pages/admin/EmployeesList';
import Dashboard from './pages/admin/Dashboard';
import DepartmentForm from './pages/admin/DepartmentForm';
import DepartmentList from './pages/admin/DepartmentList';
import "bootstrap/dist/css/bootstrap.min.css";

// Auth wrapper component
const ProtectedRoute = ({ children }) => {
  return getCurrentUser() ? children : <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes (wrapped in MainLayout) */}
        <Route element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/employees" element={<EmployeesList />} />

          {/* departments  */}
          <Route path="/admin/departments" element={<DepartmentList />} />
          <Route path="/admin/departments/new" element={<DepartmentForm />} />
          <Route path="/admin/departments/edit/:id" element={<DepartmentForm />} />
        </Route>

        {/* Redirects */}
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}