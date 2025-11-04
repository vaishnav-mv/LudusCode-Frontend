import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import ErrorAlert from '../../components/common/ErrorAlert';
import { resendVerificationOtp, verifyOTP } from '../../services/authService';
import { useFormSubmit } from '../../hooks/useFormSubmit';
import { validateOtp } from '../../utils/validators';

const OTPVerify: React.FC = () => {
  const [otp, setOtp] = useState('');
  const [errors, setErrors] = useState({ otp: '' });
  const [timeLeft, setTimeLeft] = useState(60);
  const [isResending, setIsResending] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { error, isLoading, handleSubmit } = useFormSubmit(
    (email: string, otp: string) => verifyOTP(email, otp)
  );
  const { handleSubmit: handleResend, isLoading: isResendingOtp, error: resendError, clearError: clearResendError } = useFormSubmit(
    (email: string) => resendVerificationOtp(email)
  );

  const getEmailFromQuery = () => {
    const params = new URLSearchParams(location.search);
    return params.get('email') || '';
  };
  const email = getEmailFromQuery();

  useEffect(() => {
    if (timeLeft <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    setTimeLeft(60);
  }, [email]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      alert("Email not found. Please try registering again.");
      return;
    }

    const validationErrors = {
      otp: validateOtp(otp) ?? '',
    };

    setErrors(validationErrors);

    if (Object.values(validationErrors).some(Boolean)) {
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

  const formattedTime = useMemo(() => {
    const minutes = Math.floor(timeLeft / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (timeLeft % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }, [timeLeft]);

  const onResend = async () => {
    if (timeLeft > 0 || isResending || !email) {
      return;
    }

    clearResendError();
    setIsResending(true);

    try {
      await handleResend(email);
      setTimeLeft(60);
    } catch (err) {
      // handled by hook
    } finally {
      setIsResending(false);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-center text-text-primary mb-2">Verify Your Account</h2>
      <p className="text-center text-text-secondary mb-6">An OTP has been sent to {email}.</p>
      <ErrorAlert message={error || resendError} />
      <form onSubmit={onSubmit}>
        <Input
          label="OTP Code"
          id="otp"
          type="text"
          value={otp}
          onChange={(e) => {
            setOtp(e.target.value);
            if (errors.otp) {
              setErrors({ otp: '' });
            }
          }}
          required
          error={errors.otp}
        />
        <div className="mt-6 space-y-3">
          <Button type="submit" isLoading={isLoading}>
            Verify
          </Button>
          <div className="flex items-center justify-center gap-2 text-sm text-text-secondary">
            <span>Time remaining:</span>
            <span className="font-mono text-highlight">{formattedTime}</span>
          </div>
        </div>
      </form>
       <div className="text-center mt-4">
          <p className="text-sm text-text-secondary">
            Didn't receive a code?{' '}
            <button
              type="button"
              className="text-highlight hover:underline disabled:opacity-50"
              onClick={onResend}
              disabled={timeLeft > 0 || isResending || !email}
            >
              {isResendingOtp || isResending ? 'Resending...' : 'Resend'}
            </button>
          </p>
      </div>
    </>
  );
};

export default OTPVerify;
