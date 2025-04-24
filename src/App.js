import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { getCurrentUser } from './services/auth';
import LoginPage from './pages/LoginPage';
import ContactsPage from './pages/ContactsPage';
import './Style.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route 
          path="/contacts" 
          element={
            getCurrentUser() ? (
              <ContactsPage />
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
        <Route path="*" element={<Navigate to="/contacts" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;