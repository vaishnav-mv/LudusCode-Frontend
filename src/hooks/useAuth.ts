import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { logout as logoutAction } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { persistor } from '../redux/store';
import { authService } from '../services/authService';

/**
 * Custom hook to access auth state and actions
 * Provides convenient access to user, loading state, and logout functionality
 */
export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, loading, error, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  const logout = async () => {
    await authService.logout();  // Call backend to clear cookie
    // Clear Redux state
    dispatch(logoutAction());

    // Purge persisted state
    await persistor.purge();

    // Navigate to login
    navigate('/login');
  };

  return {
    user,
    loading,
    error,
    isAuthenticated,
    logout,
  };
};
