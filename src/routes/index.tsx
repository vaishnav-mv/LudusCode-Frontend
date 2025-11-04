import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import { authRoutes } from './authRoutes';
import { userRoutes } from './userRoutes';
import { adminRoutes } from './adminRoutes';

const AppRoutes: React.FC = () => {
  const { user, loading } = useSelector((state: RootState) => state.auth);

  const getDefaultRedirect = () => {
    if (!user) return '/login';
    if (user.role === 'ADMIN') return '/admin/users';
    return '/dashboard';
  };

  // Wait until auth state is resolved
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400" />
      </div>
    );
  }

  return (
    <Routes>
      {!user && authRoutes}
      {user && user.role !== 'ADMIN' && userRoutes}
      {user && user.role === 'ADMIN' && adminRoutes}

      <Route path="/" element={<Navigate to={getDefaultRedirect()} replace />} />
      <Route path="*" element={<Navigate to={getDefaultRedirect()} replace />} />
    </Routes>
  );
};

export default AppRoutes;
