import React from 'react';
import { Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Dashboard from '../pages/dashboard/Dashboard';
import GroupsView from '../components/user/GroupsView';
import GroupDetailView from '../components/user/GroupDetailView';
import ProtectedRoute from './ProtectedRoute';
import { Role } from '../types';
import CompetitionView from '../components/user/CompetitionView';

/**
 * User Routes
 * Protected routes for authenticated users and leaders
 */
export const userRoutes = (
  <Route element={<MainLayout />}>
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute allowedRoles={[Role.User, Role.Leader]}>
          <Dashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/groups"
      element={
        <ProtectedRoute allowedRoles={[Role.User, Role.Leader]}>
          <GroupsView />
        </ProtectedRoute>
      }
    />
    <Route
      path="/groups/:groupId"
      element={
        <ProtectedRoute allowedRoles={[Role.User, Role.Leader]}>
          <GroupDetailView />
        </ProtectedRoute>
      }
    />
    <Route
      path="/groups/:groupId/competition/:competitionId"
      element={
        <ProtectedRoute allowedRoles={[Role.User, Role.Leader]}>
          <CompetitionView />
        </ProtectedRoute>
      }
    />
  </Route>
);
