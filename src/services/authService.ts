import api from './api';
import { User } from '../types';

interface LoginResponse {
  user: User;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await api.post('/auth/login', { email, password });
  const data = response.data.data;
  const role = typeof data.user.role === 'string' ? data.user.role.toUpperCase() : data.user.role;

  return {
    user: {
      id: data.user._id,
      username: data.user.username || data.user.name,
      name: data.user.name ?? data.user.username ?? data.user.email,
      email: data.user.email,
      role,
      isVerified: data.user.isVerified,
      createdAt: data.user.createdAt,
    },
  };
};

export const register = async (username: string, email: string, password: string): Promise<{ message: string }> => {
  const response = await api.post('/auth/register', { username, email, password });
  return response.data.data;
};

export const verifyOTP = async (email: string, otp: string): Promise<{ message: string }> => {
  const response = await api.post('/auth/verify-otp', { email, otp });
  return response.data.data;
};

export const resendVerificationOtp = async (email: string): Promise<{ message: string }> => {
  const response = await api.post('/auth/resend-otp', { email });
  return response.data.data;
};

export const forgotPassword = async (email: string): Promise<{ message: string }> => {
  const response = await api.post('/auth/forgot-password', { email });
  return response.data.data;
};

export const resetPassword = async (
  email: string,
  otp: string,
  newPassword: string
): Promise<{ message: string }> => {
  const response = await api.post('/auth/reset-password', { email, otp, newPassword });
  return response.data.data;
};

export const getProfile = async (): Promise<User> => {
  const response = await api.get('/auth/profile');
  const userData = response.data.data;
  const role = typeof userData.role === 'string' ? userData.role.toUpperCase() : userData.role;

  return {
    id: userData._id,
    username: userData.username || userData.name,
    name: userData.name ?? userData.username ?? userData.email,
    email: userData.email,
    role,
    isVerified: userData.isVerified,
    createdAt: userData.createdAt,
  };
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};

export const authService = {
  login,
  register,
  verifyOTP,
  resendVerificationOtp,
  forgotPassword,
  resetPassword,
  getProfile,
  logout,
};
