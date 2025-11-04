import api from './api';
import { User, Group } from '../types';

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedUsersResponse {
  users: User[];
  pagination: PaginationMeta;
}

const normalizeUsersResponse = (
  data: PaginatedUsersResponse | User[],
  fallbackLimit: number
): PaginatedUsersResponse => {
  if (Array.isArray(data)) {
    return {
      users: data,
      pagination: {
        page: 1,
        limit: fallbackLimit,
        total: data.length,
        totalPages: 1,
      },
    };
  }

  return data;
};

export const getAllUsers = async (
  page: number = 1,
  limit: number = 10
): Promise<PaginatedUsersResponse> => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  const response = await api.get(`/admin/users?${params.toString()}`);
  return normalizeUsersResponse(response.data.data, limit);
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