import React from 'react';
import Sidebar, { NavItem } from '../components/common/Sidebar';
import { HomeIcon, GroupsIcon } from '../components/common/Icons';

/**
 * User Navigation Items
 */
const userNavItems: NavItem[] = [
  {
    to: '/dashboard',
    label: 'Dashboard',
    icon: <HomeIcon />,
  },
  {
    to: '/my-groups',
    label: 'My Groups',
    icon: <GroupsIcon />,
  },
];

/**
 * Main Layout for User/Leader Pages
 * Uses reusable Sidebar component
 */
const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex bg-primary text-text-primary">
      <Sidebar 
        title="LudusCode" 
        navItems={userNavItems} 
        logoutRedirect="/login" 
      />
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;