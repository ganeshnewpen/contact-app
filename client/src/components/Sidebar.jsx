import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import SidebarItem from './SidebarItem';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: 'home' },
    { to: '/admin/departments', label: 'Departments', icon: 'building-office' },
    { to: '/admin/employees', label: 'Employees', icon: 'users' },
    { to: '/admin/salaries', label: 'Salaries', icon: 'currency-dollar' },
    { to: '/admin/attendance', label: 'Attendance', icon: 'calendar-days' },
    { to: '/admin/notices', label: 'Notices', icon: 'megaphone' },
    { to: '/admin/projects', label: 'Projects', icon: 'briefcase' },
    { to: '/admin/performance', label: 'Performance', icon: 'chart-bar' },
    { to: '/admin/audit-logs', label: 'Audit Logs', icon: 'document-text' },
  ];

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-blue-500 text-white w-64 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col shadow-lg`}
      >
        {/* Logo/Title */}
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold tracking-tight">HR Admin</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <SidebarItem
              key={item.to}
              to={item.to}
              label={item.label}
              icon={item.icon}
              onClick={() => setIsOpen(false)} // Close sidebar on mobile click
            />
          ))}
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Mobile Toggle Button */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-white p-2 rounded-full shadow-md text-primary"
        onClick={toggleSidebar}
      >
        {isOpen ? (
          <XMarkIcon className="w-6 h-6" />
        ) : (
          <Bars3Icon className="w-6 h-6" />
        )}
      </button>
    </>
  );
};

export default Sidebar;