import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { fetchUserProfile } from '../redux/slices/authSlice';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { authRoutes } from './authRoutes';
import { userRoutes } from './userRoutes';
import { adminRoutes } from './adminRoutes';

/**
 * Auth Initializer Component
 * Handles initial authentication check on app load
 */
const AuthInitializer: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { loading, user, isAuthenticated } = useAppSelector((state) => state.auth);
  const [initialCheckDone, setInitialCheckDone] = React.useState(false);

  useEffect(() => {
    // If we have persisted user data, verify it's still valid
    // If no persisted data, attempt to fetch profile (cookie might exist)
    const checkAuth = async () => {
      try {
        await dispatch(fetchUserProfile()).unwrap();
      } catch (error) {
        // If fetch fails, user will be logged out (state cleared)
        console.log('[Auth] No valid session found');
      } finally {
        setInitialCheckDone(true);
      }
    };

    checkAuth();
  }, [dispatch]);

  // Wait for initial auth check before rendering routes
  if (!initialCheckDone || loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-primary">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return children;
};

/**
 * Default Redirect Component
 * Redirects to appropriate dashboard based on user role
 */
const DefaultRedirect: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  
  if (user?.role === 'ADMIN') {
    return <Navigate to="/admin/users" replace />;
  }
  return <Navigate to="/dashboard" replace />;
};

/**
 * Main Application Routes
 * Combines all route modules
 */
export const AppRoutes: React.FC = () => {
  return (
    <AuthInitializer>
      <Routes>
        {/* Authentication Routes */}
        {authRoutes}

        {/* User Routes */}
        {userRoutes}

        {/* Admin Routes */}
        {adminRoutes}

        {/* Default Redirect - Role-based */}
        <Route path="*" element={<DefaultRedirect />} />
      </Routes>
    </AuthInitializer>
  );
};
