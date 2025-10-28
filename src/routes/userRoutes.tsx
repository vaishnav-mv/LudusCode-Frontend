import React from 'react';
import { Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Dashboard from '../pages/dashboard/Dashboard';
import MyGroups from '../pages/groups/MyGroups';
import CreateGroup from '../pages/groups/CreateGroup';
import ProtectedRoute from './ProtectedRoute';
import { Role } from '../types';

/**
 * User Routes
 * Protected routes for authenticated users and leaders
 */
export const userRoutes = (
  <>
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute allowedRoles={[Role.User, Role.Leader]}>
          <MainLayout>
            <Dashboard />
          </MainLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/my-groups"
      element={
        <ProtectedRoute allowedRoles={[Role.User, Role.Leader]}>
          <MainLayout>
            <MyGroups />
          </MainLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/create-group"
      element={
        <ProtectedRoute allowedRoles={[Role.User, Role.Leader]}>
          <MainLayout>
            <CreateGroup />
          </MainLayout>
        </ProtectedRoute>
      }
    />
  </>
);
