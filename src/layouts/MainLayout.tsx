import React, { useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Icon } from '../components/common/Icons';
import type { IconName } from '../components/common/Icons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchUserProfile } from '../redux/slices/authSlice';
// import ProfileDropdown from '../components/common/ProfileDropdown';

const NavItem: React.FC<{ to: string; icon: IconName; label: string }> = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `relative flex items-center gap-2 px-3 py-2 rounded-md text-sm font-semibold transition-colors ${
        isActive ? 'text-white' : 'text-gray-400 hover:text-white'
      }`
    }
  >
    {({ isActive }) => (
      <>
        <Icon name={icon} className="w-5 h-5" />
        <span>{label}</span>
        {isActive && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400" />}
      </>
    )}
  </NavLink>
);

const MainLayout: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !loading) {
      dispatch(fetchUserProfile())
        .unwrap()
        .catch(() => {
          navigate('/login');
        });
    }
  }, [user, loading, dispatch, navigate]);

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white font-sans">
      <header className="sticky top-0 z-40 w-full bg-gray-800/80 border-b border-gray-700 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            <Icon name="terminal" className="w-8 h-8 text-cyan-400" />
            <span className="text-xl font-orbitron font-bold">LudusCode</span>
          </div>
          <nav className="hidden md:flex items-center gap-2">
            <NavItem to="/dashboard" icon="dashboard" label="Dashboard" />
            <NavItem to="/duels" icon="swords" label="Duels" />
            <NavItem to="/practice" icon="code" label="Practice" />
            <NavItem to="/groups" icon="users" label="Groups" />
            <NavItem to="/leaderboard" icon="trophy" label="Leaderboard" />
            <NavItem to="/wallet" icon="dollar-sign" label="Wallet" />
            <NavItem to="/achievements" icon="award" label="Achievements" />
          </nav>
          {/* <div className="flex items-center gap-4">
            <ProfileDropdown user={user} />
          </div> */}
        </div>
      </header>
      <main className="flex-1 container mx-auto p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
