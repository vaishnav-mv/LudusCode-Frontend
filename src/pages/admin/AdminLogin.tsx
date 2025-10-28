import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { login as loginAction } from '../../redux/slices/authSlice';
import { login } from '../../services/authService';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import ErrorAlert from '../../components/common/ErrorAlert';
import { useFormSubmit } from '../../hooks/useFormSubmit';
import { Role } from '../../types';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminError, setAdminError] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { error, isLoading, handleSubmit } = useFormSubmit(
    (email: string, password: string) => login(email, password)
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError('');
    try {
      const { user } = await handleSubmit(email, password);
      if (user.role !== Role.Admin) {
        setAdminError('Access denied. Only admins can log in here.');
        return;
      }
      // Token is set by backend as HTTP-only cookie
      dispatch(loginAction({ user }));
      navigate('/admin/users');
    } catch (err) {
      // Error is handled by useFormSubmit hook
    }
  };

  const displayError = adminError || error;

  return (
    <>
      <h2 className="text-2xl font-bold text-center text-text-primary mb-6">Admin Login</h2>
      <ErrorAlert message={displayError} />
      <form onSubmit={onSubmit}>
        <Input
          label="Email"
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label="Password"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="mt-6">
          <Button type="submit" isLoading={isLoading}>
            Login
          </Button>
        </div>
      </form>
      <div className="text-center mt-4">
        <Link to="/login" className="text-sm text-highlight hover:underline">
          Not an admin? Login here
        </Link>
      </div>
    </>
  );
};

export default AdminLogin;
