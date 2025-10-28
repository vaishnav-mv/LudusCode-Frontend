import React from 'react';
import { Route } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import OTPVerify from '../pages/auth/OTPVerify';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';
import AdminLogin from '../pages/admin/AdminLogin';

/**
 * Authentication Routes
 * All public routes for authentication flows
 */
export const authRoutes = (
  <Route element={<AuthLayout />}>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/otp-verify" element={<OTPVerify />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/reset-password" element={<ResetPassword />} />
    <Route path="/admin/login" element={<AdminLogin />} />
  </Route>
);
