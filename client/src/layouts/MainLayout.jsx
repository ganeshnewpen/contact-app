import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import '../App.css';


const MainLayout = () => {
  const location = useLocation();

  return (
    <div className="d-flex vh-100">
      {/* Sidebar (visible on all authenticated routes) */}
      <Sidebar activePath={location.pathname} />

      {/* Main content area */}
      <div className="flex-grow-1 overflow-auto p-4">
        <Outlet /> {/* This renders child routes */}
      </div>
    </div>
  );
};

export default MainLayout;