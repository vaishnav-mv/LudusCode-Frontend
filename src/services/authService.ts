import api from './api';
import { User } from '../types';

interface LoginResponse {
  user: User;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await api.post('/auth/login', { email, password });
  return response.data.data;
};

export const register = async (username: string, email: string, password: string): Promise<{ message: string }> => {
  const response = await api.post('/auth/register', { username, email, password });
  return response.data.data;
};

export const verifyOTP = async (email: string, otp: string): Promise<{ message: string }> => {
  const response = await api.post('/auth/verify-otp', { email, otp });
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
  const response = await api.get<{ data: User }>('/auth/profile');
  return response.data.data;
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};

export const authService = {
  login,
  register,
  verifyOTP,
  forgotPassword,
  resetPassword,
  getProfile,
  logout,
};
