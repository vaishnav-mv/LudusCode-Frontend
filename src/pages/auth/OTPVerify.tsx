import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import ErrorAlert from '../../components/common/ErrorAlert';
import { verifyOTP } from '../../services/authService';
import { useFormSubmit } from '../../hooks/useFormSubmit';

const OTPVerify: React.FC = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { error, isLoading, handleSubmit } = useFormSubmit(
    (email: string, otp: string) => verifyOTP(email, otp)
  );

  const getEmailFromQuery = () => {
    const params = new URLSearchParams(location.search);
    return params.get('email') || '';
  };
  const email = getEmailFromQuery();


  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      alert("Email not found. Please try registering again.");
      return;
    }
    try {
      await handleSubmit(email, otp);
      // Redirect to login after successful verification
      navigate('/login');
    } catch (err) {
      // Error is handled by useFormSubmit hook
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-center text-text-primary mb-2">Verify Your Account</h2>
      <p className="text-center text-text-secondary mb-6">An OTP has been sent to {email}.</p>
      <ErrorAlert message={error} />
      <form onSubmit={onSubmit}>
        <Input
          label="OTP Code"
          id="otp"
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <div className="mt-6">
          <Button type="submit" isLoading={isLoading}>
            Verify
          </Button>
        </div>
      </form>
       <div className="text-center mt-4">
          <p className="text-sm text-text-secondary">
            Didn't receive a code?{' '}
            <button className="text-highlight hover:underline">
              Resend
            </button>
          </p>
      </div>
    </>
  );
};

export default OTPVerify;
