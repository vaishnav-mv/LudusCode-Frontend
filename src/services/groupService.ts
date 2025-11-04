import api from './api';
import { Group } from '../models';

export const createGroup = async (data: { name: string; description?: string; topics?: string[] }): Promise<Group> => {
  const response = await api.post('/groups', data);
  return response.data.data;
};

export const getGroups = async (): Promise<Group[]> => {
  const response = await api.get('/groups');
  return response.data.data;
};

export const getMyGroups = async (): Promise<Group[]> => {
  const response = await api.get('/groups/my-groups');
  return response.data.data;
};

export const getGroupById = async (groupId: string): Promise<Group> => {
  const response = await api.get(`/groups/${groupId}`);
  return response.data.data;
};

export const isUserInGroup = async (groupId: string, userId: string): Promise<boolean> => {
  try {
    const response = await api.get(`/groups/${groupId}/members/${userId}`);
    return response.data.isMember;
  } catch (error) {
    console.error('Error checking group membership:', error);
    return false;
  }
};

export const joinGroup = async (groupId: string, userId: string): Promise<void> => {
  const response = await api.post(`/groups/${groupId}/join`);
  return response.data;
};

export const leaveGroup = async (groupId: string, userId: string): Promise<void> => {
  const response = await api.post(`/groups/${groupId}/leave`);
  return response.data;
};