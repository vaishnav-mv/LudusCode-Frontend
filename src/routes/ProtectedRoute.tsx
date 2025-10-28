import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import { Role } from '../types';
import LoadingSpinner from '../components/common/LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactElement;
  allowedRoles: Role[];
  redirectTo?: string;
}

/**
 * Protected Route component that checks authentication and authorization
 * Redirects to login if not authenticated
 * Shows loading spinner while checking auth state
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
  redirectTo = '/login',
}) => {
  const { user, loading, isAuthenticated } = useAppSelector((state) => state.auth);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-primary">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to={redirectTo} replace />;
  }

  // Check if user has required role
  if (!allowedRoles.includes(user.role)) {
    // Redirect based on user role
    if (user.role === Role.Admin) {
      return <Navigate to="/admin/users" replace />;
    }
    if (user.role === Role.User || user.role === Role.Leader) {
      return <Navigate to="/dashboard" replace />;
    }
    // Invalid role - logout and redirect to login
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
