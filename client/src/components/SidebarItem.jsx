import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  BuildingOfficeIcon,
  UsersIcon,
  CurrencyDollarIcon,
  CalendarDaysIcon,
  MegaphoneIcon,
  BriefcaseIcon,
  ChartBarIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/solid';

const iconMap = {
  home: HomeIcon,
  'building-office': BuildingOfficeIcon,
  users: UsersIcon,
  'currency-dollar': CurrencyDollarIcon,
  'calendar-days': CalendarDaysIcon,
  megaphone: MegaphoneIcon,
  briefcase: BriefcaseIcon,
  'chart-bar': ChartBarIcon,
  'document-text': DocumentTextIcon,
};

const SidebarItem = ({ to, label, icon, onClick }) => {
  const Icon = iconMap[icon] || HomeIcon; // Fallback to HomeIcon

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center p-2 rounded-lg transition-colors duration-200 ${
          isActive ? 'bg-secondary text-white' : 'text-gray-200 hover:bg-gray-700'
        }`
      }
      onClick={onClick}
    >
      <Icon className="w-6 h-6 mr-3" />
      <span>{label}</span>
    </NavLink>
  );
};

export default SidebarItem;