import React from 'react';

interface ErrorAlertProps {
  message?: string;
  className?: string;
}

/**
 * Reusable error alert component
 * Displays error messages in a consistent style across the application
 */
const ErrorAlert: React.FC<ErrorAlertProps> = ({ message, className = '' }) => {
  if (!message) return null;

  return (
    <div
      className={`bg-red-900 text-red-300 p-3 rounded-lg mb-4 text-center ${className}`}
      role="alert"
    >
      {message}
    </div>
  );
};

export default ErrorAlert;
