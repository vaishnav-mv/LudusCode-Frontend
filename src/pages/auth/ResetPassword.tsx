import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import ErrorAlert from '../../components/common/ErrorAlert';
import { resetPassword } from '../../services/authService';
import { useFormSubmit } from '../../hooks/useFormSubmit';
import { validateEmail, validateOtp, validatePassword } from '../../utils/validators';

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const emailFromQuery = searchParams.get('email') || '';
  
  const [email, setEmail] = useState(emailFromQuery);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({ email: '', otp: '', newPassword: '', confirmPassword: '' });
  
  const navigate = useNavigate();
  const { error, isLoading, handleSubmit } = useFormSubmit(resetPassword);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = {
      email: validateEmail(email) ?? '',
      otp: validateOtp(otp) ?? '',
      newPassword: validatePassword(newPassword, 'New password') ?? '',
      confirmPassword: '',
    };

    if (!validationErrors.newPassword && newPassword !== confirmPassword) {
      validationErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(validationErrors);

    if (Object.values(validationErrors).some(Boolean)) {
      return;
    }

    try {
      await handleSubmit(email, otp, newPassword);
      setSuccess(true);
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      // Error is handled by useFormSubmit hook
    }
  };

  if (success) {
    return (
      <div className="text-center">
        <div className="bg-green-900 text-green-300 p-4 rounded-lg mb-4">
          <h2 className="text-xl font-bold mb-2">Password Reset Successful!</h2>
          <p>Redirecting to login page...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-2xl font-bold text-center text-text-primary mb-6">
        Reset Password
      </h2>
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
          label="OTP Code"
          id="otp"
          type="text"
          value={otp}
          onChange={(e) => {
            setOtp(e.target.value);
            if (errors.otp) {
              setErrors((prev) => ({ ...prev, otp: '' }));
            }
          }}
          placeholder="Enter 6-digit code"
          maxLength={6}
          required
          error={errors.otp}
        />
        <Input
          label="New Password"
          id="newPassword"
          type="password"
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
            if (errors.newPassword) {
              setErrors((prev) => ({ ...prev, newPassword: '' }));
            }
          }}
          required
          error={errors.newPassword}
        />
        <Input
          label="Confirm Password"
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            if (errors.confirmPassword) {
              setErrors((prev) => ({ ...prev, confirmPassword: '' }));
            }
          }}
          required
          error={errors.confirmPassword}
        />
        <div className="mt-6">
          <Button type="submit" isLoading={isLoading}>
            Reset Password
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

export default ResetPassword;
