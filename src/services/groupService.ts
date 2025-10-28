import api from './api';
import { Group } from '../types';

export const createGroup = async (name: string): Promise<Group> => {
  const response = await api.post('/groups', { name });
  return response.data.data;
};

export const getMyGroups = async (): Promise<Group[]> => {
  const response = await api.get('/groups/my-groups');
  return response.data.data;
};