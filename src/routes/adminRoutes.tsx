import React from 'react';
import { Route } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import UsersList from '../pages/admin/UsersList';
import PendingGroups from '../pages/admin/PendingGroups';
import ProtectedRoute from './ProtectedRoute';
import { Role } from '../types';

/**
 * Admin Routes
 * Protected routes for admin users only
 */
export const adminRoutes = (
  <>
    <Route
      path="/admin"
      element={
        <ProtectedRoute allowedRoles={[Role.Admin]} redirectTo="/admin/login">
          <AdminLayout>
            <UsersList />
          </AdminLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/users"
      element={
        <ProtectedRoute allowedRoles={[Role.Admin]} redirectTo="/admin/login">
          <AdminLayout>
            <UsersList />
          </AdminLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/groups"
      element={
        <ProtectedRoute allowedRoles={[Role.Admin]} redirectTo="/admin/login">
          <AdminLayout>
            <PendingGroups />
          </AdminLayout>
        </ProtectedRoute>
      }
    />
  </>
);
