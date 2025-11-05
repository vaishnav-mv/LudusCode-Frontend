import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { useAppDispatch } from '../../redux/hooks';
import { login as loginAction } from '../../redux/slices/authSlice';
import { login } from '../../services/authService';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import ErrorAlert from '../../components/common/ErrorAlert';
import { useFormSubmit } from '../../hooks/useFormSubmit';
import { Role } from '../../types';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../../utils/validators';

const adminLoginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .refine((value) => EMAIL_REGEX.test(value), {
      message: 'Enter a valid email address',
    }),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .refine((value) => PASSWORD_REGEX.test(value), {
      message: 'Password must contain at least one letter and one number',
    }),
});

type AdminLoginValues = z.infer<typeof adminLoginSchema>;

const AdminLogin: React.FC = () => {
  const [adminError, setAdminError] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { error, isLoading, handleSubmit } = useFormSubmit(
    (email: string, password: string) => login(email, password)
  );

  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors },
  } = useForm<AdminLoginValues>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = handleFormSubmit(async ({ email, password }) => {
    setAdminError('');
    try {
      const { user } = await handleSubmit(email, password);
      if (user.role !== Role.Admin) {
        setAdminError('Access denied. Only admins can log in here.');
        return;
      }
      // Token is set by backend as HTTP-only cookie
      dispatch(loginAction({ user }));
      navigate('/admin/users');
    } catch (err) {
      // Error is handled by useFormSubmit hook
    }
  });

  const displayError = adminError || error;

  return (
    <>
      <h2 className="text-2xl font-bold text-center text-text-primary mb-6">Admin Login</h2>
      <ErrorAlert message={displayError} />
      <form onSubmit={onSubmit} noValidate>
        <Input
          label="Email"
          id="email"
          type="email"
          autoComplete="email"
          {...register('email')}
          error={errors.email?.message}
        />
        <Input
          label="Password"
          id="password"
          type="password"
          autoComplete="current-password"
          {...register('password')}
          error={errors.password?.message}
        />
        <div className="mt-6">
          <Button type="submit" isLoading={isLoading}>
            Login
          </Button>
        </div>
      </form>
      <div className="text-center mt-4">
        <Link to="/login" className="text-sm text-highlight hover:underline">
          Not an admin? Login here
        </Link>
      </div>
    </>
  );
};

export default AdminLogin;
