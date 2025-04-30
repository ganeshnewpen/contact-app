// import React from 'react';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Nav, Navbar, Button } from 'react-bootstrap';
import { getCurrentUser, logout } from "../services/auth";

import {
  FaUsers,
  FaMoneyBillAlt,
  FaCalendarCheck,
  FaClipboardList,
  FaBriefcase,
  FaChartLine,
  FaHistory,
  FaBuilding,
  FaSignOutAlt
} from 'react-icons/fa';
import SidebarItem from './SidebarItem';


const Sidebar = ({ activePath }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      navigate("/login");
    }
  }, []);
  const handleLogout = () => { logout(); navigate("/login"); };




  const menuItems = [
    { href: '/admin/dashboard', icon: FaChartLine, title: 'Dashboard' },
    { href: '/admin/departments', icon: FaBuilding, title: 'Departments' },
    { href: '/contacts', icon: FaUsers, title: 'Employees' },
    { href: '/attendance', icon: FaCalendarCheck, title: 'Attendance' },
    { href: '/leaves', icon: FaClipboardList, title: 'Leave Management' },
    { href: '/salaries', icon: FaMoneyBillAlt, title: 'Salaries' },
    { href: '/projects', icon: FaBriefcase, title: 'Projects' },
    { href: '/performance', icon: FaChartLine, title: 'Performance' },
    { href: '/audit-logs', icon: FaHistory, title: 'Audit Logs' }
  ];

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="flex-column sidebar">
      <Navbar.Brand href="/" className="mb-4 p-3">
        <h4>HRM System</h4>
      </Navbar.Brand>

      <Nav className="flex-column w-100">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            title={item.title}
            isActive={activePath === item.href}
          />
        ))}
      </Nav>

      <div className="mt-auto p-3 w-100">
        <Button variant="danger" className="w-100" onClick={handleLogout}>
          <FaSignOutAlt className="me-2" /> Logout
        </Button>
      </div>
    </Navbar>
  );
};

export default Sidebar;