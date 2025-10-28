import { useState } from 'react';

/**
 * Custom hook to handle form submission with loading and error states
 * Reduces code duplication across all form components
 */
export const useFormSubmit = <T = any>(
  submitFn: (...args: any[]) => Promise<T>
) => {
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (...args: any[]): Promise<T | undefined> => {
    setError('');
    setIsLoading(true);
    try {
      const result = await submitFn(...args);
      return result;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        'An unknown error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError('');

  return { error, isLoading, handleSubmit, clearError };
};
