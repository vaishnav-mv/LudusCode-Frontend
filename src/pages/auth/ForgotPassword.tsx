import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import ErrorAlert from '../../components/common/ErrorAlert';
import { forgotPassword } from '../../services/authService';
import { useFormSubmit } from '../../hooks/useFormSubmit';
import { validateEmail } from '../../utils/validators';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({ email: '' });
  const navigate = useNavigate();
  const { error, isLoading, handleSubmit } = useFormSubmit(forgotPassword);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = {
      email: validateEmail(email) ?? '',
    };

    setErrors(validationErrors);

    if (Object.values(validationErrors).some(Boolean)) {
      return;
    }

    try {
      const res = await handleSubmit(email);
      setMessage(res.message);
      
      // Redirect to reset password page after 2 seconds
      setTimeout(() => {
        navigate(`/reset-password?email=${encodeURIComponent(email)}`);
      }, 2000);
    } catch (err) {
      // Error is handled by useFormSubmit hook
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-center text-text-primary mb-6">Reset Password</h2>
      <ErrorAlert message={error} />
      {message && <p className="bg-green-900 text-green-300 p-3 rounded-lg mb-4 text-center">{message}</p>}
      <form onSubmit={onSubmit}>
        <Input
          label="Email"
          id="email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) {
              setErrors({ email: '' });
            }
          }}
          required
          error={errors.email}
        />
        <div className="mt-6">
          <Button type="submit" isLoading={isLoading}>
            Send OTP
          </Button>
        </div>
      </form>
      <div className="text-center mt-4">
        <Link to="/login" className="text-sm text-highlight hover:underline">
          Back to Login
        </Link>
      </div>
    </>
  );
};

export default ForgotPassword;
