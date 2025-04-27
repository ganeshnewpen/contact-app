import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { getCurrentUser } from './services/auth';
import LoginPage from './pages/LoginPage';
import ContactsPage from './pages/ContactsPage';
import Dashboard from './pages/Dashboard';
import './Style.css';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
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
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;