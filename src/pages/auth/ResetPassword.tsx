import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import ErrorAlert from '../../components/common/ErrorAlert';
import { resetPassword } from '../../services/authService';
import { useFormSubmit } from '../../hooks/useFormSubmit';

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const emailFromQuery = searchParams.get('email') || '';
  
  const [email, setEmail] = useState(emailFromQuery);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(false);
  
  const navigate = useNavigate();
  const { error, isLoading, handleSubmit } = useFormSubmit(resetPassword);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    if (newPassword.length < 6) {
      alert('Password must be at least 6 characters long');
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
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label="OTP Code"
          id="otp"
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter 6-digit code"
          maxLength={6}
          required
        />
        <Input
          label="New Password"
          id="newPassword"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <Input
          label="Confirm Password"
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
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
