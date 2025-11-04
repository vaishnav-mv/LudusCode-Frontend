import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import ErrorAlert from '../../components/common/ErrorAlert';
import { register } from '../../services/authService';
import { useFormSubmit } from '../../hooks/useFormSubmit';
import { validateEmail, validatePassword, validateRequired } from '../../utils/validators';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();
  const { error, isLoading, handleSubmit } = useFormSubmit(
    (username: string, email: string, password: string) => register(username, email, password)
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = {
      username: validateRequired(username, 'Username') ?? '',
      email: validateEmail(email) ?? '',
      password: validatePassword(password) ?? '',
    };

    setErrors(validationErrors);

    if (Object.values(validationErrors).some(Boolean)) {
      return;
    }

    try {
      await handleSubmit(username, email, password);
      // Pass email to OTP page to identify user
      navigate(`/otp-verify?email=${encodeURIComponent(email)}`);
    } catch (err) {
      // Error is handled by useFormSubmit hook
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-center text-text-primary mb-6">Create Account</h2>
      <ErrorAlert message={error} />
      <form onSubmit={onSubmit}>
        <Input
          label="Username"
          id="username"
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            if (errors.username) {
              setErrors((prev) => ({ ...prev, username: '' }));
            }
          }}
          required
          error={errors.username}
        />
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
            Register
          </Button>
        </div>
      </form>
      <div className="text-center mt-4">
        <p className="text-sm text-text-secondary">
          Already have an account?{' '}
          <Link to="/login" className="text-highlight hover:underline">
            Login
          </Link>
        </p>
      </div>
    </>
  );
};

export default Register;
