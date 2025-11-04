const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d).+$/;

export const validateRequired = (value: string, label: string): string | null => {
  if (!value || !value.trim()) {
    return `${label} is required`;
  }
  return null;
};

export const validateEmail = (value: string): string | null => {
  const trimmed = value.trim();
  if (!trimmed) {
    return 'Email is required';
  }
  if (!EMAIL_REGEX.test(trimmed)) {
    return 'Enter a valid email address';
  }
  return null;
};

export const validatePassword = (value: string, label = 'Password', minLength = 8): string | null => {
  if (!value) {
    return `${label} is required`;
  }
  if (value.length < minLength) {
    return `${label} must be at least ${minLength} characters`;
  }
  if (!PASSWORD_REGEX.test(value)) {
    return `${label} must contain at least one letter and one number`;
  }
  return null;
};

export const validateOtp = (value: string, digits = 6): string | null => {
  const trimmed = value.trim();
  if (!trimmed) {
    return 'OTP code is required';
  }
  if (!new RegExp(`^\\d{${digits}}$`).test(trimmed)) {
    return `Enter a ${digits}-digit numeric OTP code`;
  }
  return null;
};
