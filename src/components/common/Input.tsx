
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, id, error, className = '', ...props }) => {
  const baseClass = 'w-full px-4 py-2 bg-accent border rounded-lg text-text-primary focus:outline-none transition';
  const focusClass = error ? ' focus:ring-2 focus:ring-red-500 focus:border-red-500 border-red-500' : ' focus:ring-2 focus:ring-highlight focus:border-transparent border-gray-600';
  const computedClass = `${baseClass}${focusClass}${className ? ` ${className}` : ''}`;

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-text-secondary mb-2">
        {label}
      </label>
      <input
        id={id}
        className={computedClass}
        {...props}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Input;
