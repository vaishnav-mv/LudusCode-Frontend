
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
({ label, id, error, hint, className = '', ...props }, ref) => {
  const baseClass = 'w-full px-4 py-2 bg-accent border rounded-lg text-text-primary focus:outline-none transition';
  const focusClass = error
    ? ' focus:ring-2 focus:ring-red-500 focus:border-red-500 border-red-500'
    : ' focus:ring-2 focus:ring-highlight focus:border-transparent border-gray-600';
  const computedClass = `${baseClass}${focusClass}${className ? ` ${className}` : ''}`;
  const helperId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-text-secondary mb-2">
        {label}
      </label>
      {hint && !error && (
        <p id={helperId} className="text-xs text-text-secondary mb-1">
          {hint}
        </p>
      )}
      <input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : helperId}
        className={computedClass}
        ref={ref}
        {...props}
      />
      {error && (
        <p id={errorId} className="text-red-500 text-xs mt-1">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
