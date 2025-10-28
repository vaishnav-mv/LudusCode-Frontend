import React from 'react';

type StatusVariant = 'success' | 'warning' | 'danger' | 'info';

interface StatusBadgeProps {
  status: string;
  variant?: StatusVariant;
}

/**
 * Reusable status badge component
 * Displays status labels with consistent styling
 */
const StatusBadge: React.FC<StatusBadgeProps> = ({ status, variant }) => {
  // Auto-detect variant from status if not provided
  const getVariant = (): StatusVariant => {
    if (variant) return variant;

    const statusLower = status.toLowerCase();
    if (statusLower.includes('approved') || statusLower.includes('active')) {
      return 'success';
    }
    if (statusLower.includes('pending')) {
      return 'warning';
    }
    if (statusLower.includes('rejected') || statusLower.includes('failed')) {
      return 'danger';
    }
    return 'info';
  };

  const variantClasses: Record<StatusVariant, string> = {
    success: 'bg-green-900 text-green-300',
    warning: 'bg-yellow-900 text-yellow-300',
    danger: 'bg-red-900 text-red-300',
    info: 'bg-blue-900 text-blue-300',
  };

  const finalVariant = getVariant();

  return (
    <span
      className={`${variantClasses[finalVariant]} py-1 px-3 rounded-full text-xs inline-block`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
