import React from 'react';
import Sidebar, { NavItem } from '../components/common/Sidebar';
import { UsersIcon, GroupsIcon } from '../components/common/Icons';

/**
 * Admin Navigation Items
 */
const adminNavItems: NavItem[] = [
  {
    to: '/admin/users',
    label: 'Users',
    icon: <UsersIcon />,
  },
  {
    to: '/admin/groups',
    label: 'Pending Groups',
    icon: <GroupsIcon />,
  },
];

/**
 * Admin Layout for Admin Pages
 * Uses reusable Sidebar component
 */
const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex bg-primary text-text-primary">
      <Sidebar 
        title="LudusCode Admin" 
        navItems={adminNavItems} 
        logoutRedirect="/admin/login" 
      />
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
