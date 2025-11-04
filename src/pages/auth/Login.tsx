import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { login as loginAction } from '../../redux/slices/authSlice';
import { login } from '../../services/authService';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import ErrorAlert from '../../components/common/ErrorAlert';
import { useFormSubmit } from '../../hooks/useFormSubmit';
import { validateEmail, validatePassword } from '../../utils/validators';

const Login: React.FC = () => {
  const [email, setEmail] = useState('user@ludus.code');
  const [password, setPassword] = useState('User@123');
  const [errors, setErrors] = useState<{ email: string; password: string }>({ email: '', password: '' });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { error, isLoading, handleSubmit } = useFormSubmit(
    (email: string, password: string) => login(email, password)
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = {
      email: validateEmail(email) ?? '',
      password: validatePassword(password) ?? '',
    };

    setErrors(validationErrors);

    if (Object.values(validationErrors).some(Boolean)) {
      return;
    }

    try {
      const { user } = await handleSubmit(email, password);
      // Token is set by backend as HTTP-only cookie
      dispatch(loginAction({ user }));
      navigate('/dashboard');
    } catch (err) {
      // Error is handled by useFormSubmit hook
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-center text-text-primary mb-6">User Login</h2>
      <ErrorAlert message={error} />
      <form onSubmit={onSubmit}>
        <Input
          label="Email"
          id="email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) {
              setErrors((prev) => ({ ...prev, email: '' }));
            }
          }}
          required
          error={errors.email}
        />
        <Input
          label="Password"
          id="password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password) {
              setErrors((prev) => ({ ...prev, password: '' }));
            }
          }}
          required
          error={errors.password}
        />
        <div className="mt-6">
          <Button type="submit" isLoading={isLoading}>
            Login
          </Button>
        </div>
      </form>
      <div className="text-center mt-4">
        <Link to="/forgot-password" className="text-sm text-highlight hover:underline">
          Forgot Password?
        </Link>
      </div>
      <div className="text-center mt-2">
        <p className="text-sm text-text-secondary">
          Don't have an account?{' '}
          <Link to="/register" className="text-highlight hover:underline">
            Register
          </Link>
        </p>
      </div>
    </>
  );
};

export default Login;
