import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Icon } from './Icons';
import { User } from '../../types';
import { logout as logoutAction } from '../../redux/slices/authSlice';
import { logout as logoutService } from '../../services/authService';

interface ProfileDropdownProps {
  user: User;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutService();
      dispatch(logoutAction());
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // Still logout locally
      dispatch(logoutAction());
      navigate('/login');
    }
  };

  const handleProfile = () => {
    navigate('/profile');
    setIsOpen(false);
  };

  const displayName = user.username || (user as any).name || user.email || 'User';
  const initial = displayName.charAt(0)?.toUpperCase() || 'U';

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-700 transition-colors"
      >
        <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-white font-semibold">
          {initial}
        </div>
        <span className="text-sm font-medium">{displayName}</span>
        <Icon name="chevron-down" className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-50">
          <div className="py-1">
            <button
              onClick={handleProfile}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              <Icon name="user" className="w-4 h-4" />
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              <Icon name="log-out" className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
