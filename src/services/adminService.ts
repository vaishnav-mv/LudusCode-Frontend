import api from './api';
import { User, Group } from '../types';

export interface PaginatedUsersResponse {
  users: User[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const getAllUsers = async (page?: number, limit?: number): Promise<User[] | PaginatedUsersResponse> => {
  const params = new URLSearchParams();
  if (page) params.append('page', page.toString());
  if (limit) params.append('limit', limit.toString());
  
  const url = params.toString() ? `/admin/users?${params.toString()}` : '/admin/users';
  const response = await api.get(url);
  return response.data.data;
};

export const getPendingGroups = async (): Promise<Group[]> => {
  const response = await api.get('/admin/groups/pending');
  return response.data.data;
};

export const approveGroup = async (groupId: string): Promise<Group> => {
  const response = await api.patch(`/admin/groups/${groupId}/approve`);
  return response.data.data;
};

export const rejectGroup = async (groupId: string): Promise<Group> => {
  const response = await api.patch(`/admin/groups/${groupId}/reject`);
  return response.data.data;
};