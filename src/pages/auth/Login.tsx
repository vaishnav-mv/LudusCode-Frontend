import React from 'react';
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
import { EMAIL_REGEX, PASSWORD_REGEX } from '../../utils/validators';

const loginSchema = z.object({
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

type LoginFormValues = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { error, isLoading, handleSubmit } = useFormSubmit(
    (email: string, password: string) => login(email, password)
  );

  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'user@ludus.code',
      password: 'User@123',
    },
  });

  const onSubmit = handleFormSubmit(async ({ email, password }) => {
    try {
      const { user } = await handleSubmit(email, password);
      dispatch(loginAction({ user }));
      navigate('/dashboard');
    } catch (err) {
      // handled by useFormSubmit
    }
  });

  return (
    <>
      <h2 className="text-2xl font-bold text-center text-text-primary mb-6">User Login</h2>
      <ErrorAlert message={error} />
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
        <Link to="/forgot-password" className="text-sm text-highlight hover:underline">
          Forgot Password?
        </Link>
      </div>
      <div className="text-center mt-2">
        <p className="text-sm text-text-secondary">
          Don't have an account?{' '}
          <Link to="/register" className="text-highlight hover:underline">
            Register
          </Link>
        </p>
      </div>
    </>
  );
};

export default Login;
