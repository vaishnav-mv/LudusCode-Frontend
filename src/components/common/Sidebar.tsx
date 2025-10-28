import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { logout } from '../../redux/slices/authSlice';
import { LogoutIcon } from './Icons';

/**
 * Navigation Link Item Interface
 */
export interface NavItem {
  to: string;
  label: string;
  icon: React.ReactElement;
}

/**
 * Sidebar Props Interface
 */
interface SidebarProps {
  title: string;
  navItems: NavItem[];
  logoutRedirect: string;
}

/**
 * Reusable Sidebar Link Component
 */
const SidebarLink: React.FC<{ to: string; children: React.ReactNode; icon: React.ReactElement }> = ({ 
  to, 
  children, 
  icon 
}) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center px-4 py-3 my-1 rounded-lg transition-colors duration-200 ${
        isActive 
          ? 'bg-highlight text-white' 
          : 'text-text-secondary hover:bg-accent hover:text-text-primary'
      }`
    }
  >
    <span className="mr-3">{icon}</span>
    {children}
  </NavLink>
);

/**
 * Reusable Sidebar Component
 * Used for both User and Admin sidebars
 */
const Sidebar: React.FC<SidebarProps> = ({ title, navItems, logoutRedirect }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate(logoutRedirect);
  };

  return (
    <aside className="w-64 bg-secondary h-screen p-4 flex flex-col fixed">
      {/* Logo/Title */}
      <div className="text-2xl font-bold text-highlight mb-10 pl-4">
        {title}
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow">
        {navItems.map((item) => (
          <SidebarLink key={item.to} to={item.to} icon={item.icon}>
            {item.label}
          </SidebarLink>
        ))}
      </nav>

      {/* Logout Button */}
      <div>
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3 my-1 rounded-lg text-text-secondary hover:bg-red-600 hover:text-white transition-colors duration-200"
        >
          <LogoutIcon />
          <span className="ml-3">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
