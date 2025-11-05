import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import ErrorAlert from '../../components/common/ErrorAlert';
import { register as registerUser } from '../../services/authService';
import { useFormSubmit } from '../../hooks/useFormSubmit';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../../utils/validators';

const registerSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, 'Username is required')
    .max(30, 'Username must be 30 characters or fewer'),
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

type RegisterFormValues = z.infer<typeof registerSchema>;

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { error, isLoading, handleSubmit: submitForm } = useFormSubmit(
    (username: string, email: string, password: string) => registerUser(username, email, password)
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = handleSubmit(async ({ username, email, password }) => {
    try {
      await submitForm(username, email, password);
      navigate(`/otp-verify?email=${encodeURIComponent(email)}`);
    } catch (err) {
      // handled by useFormSubmit
    }
  });

  return (
    <>
      <h2 className="text-2xl font-bold text-center text-text-primary mb-6">Create Account</h2>
      <ErrorAlert message={error} />
      <form onSubmit={onSubmit} noValidate>
        <Input
          label="Username"
          id="username"
          type="text"
          autoComplete="username"
          {...register('username')}
          error={errors.username?.message}
        />
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
          autoComplete="new-password"
          hint="Minimum 8 characters with at least one letter and number"
          {...register('password')}
          error={errors.password?.message}
        />
        <div className="mt-6">
          <Button type="submit" isLoading={isLoading}>
            Register
          </Button>
        </div>
      </form>
      <div className="text-center mt-4">
        <p className="text-sm text-text-secondary">
          Already have an account?{' '}
          <Link to="/login" className="text-highlight hover:underline">
            Login
          </Link>
        </p>
      </div>
    </>
  );
};

export default Register;
