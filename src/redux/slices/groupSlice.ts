// redux/slices/groupSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Group } from '../../types';
import { getGroups, getGroupById, getMyPendingGroups } from '../../services/groupService';

interface GroupState {
  groups: Group[];
  pendingGroups: Group[];
  selectedGroup: Group | null;
  listStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  detailStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  pendingStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: GroupState = {
  groups: [],
  pendingGroups: [],
  selectedGroup: null,
  listStatus: 'idle',
  detailStatus: 'idle',
  pendingStatus: 'idle',
};

export const fetchGroups = createAsyncThunk('groups/fetchGroups', async () => {
  const groups = await getGroups();
  return groups;
});

export const fetchPendingGroups = createAsyncThunk('groups/fetchPendingGroups', async () => {
  const groups = await getMyPendingGroups();
  return groups;
});

export const fetchGroupById = createAsyncThunk('groups/fetchGroupById', async (groupId: string) => {
    const group = await getGroupById(groupId);
    return group;
});

const groupSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroups.pending, (state) => {
        state.listStatus = 'loading';
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.listStatus = 'succeeded';
        state.groups = action.payload;
      })
      .addCase(fetchGroups.rejected, (state) => {
        state.listStatus = 'failed';
      })
      .addCase(fetchPendingGroups.pending, (state) => {
        state.pendingStatus = 'loading';
      })
      .addCase(fetchPendingGroups.fulfilled, (state, action) => {
        state.pendingStatus = 'succeeded';
        state.pendingGroups = action.payload;
      })
      .addCase(fetchPendingGroups.rejected, (state) => {
        state.pendingStatus = 'failed';
      })
      .addCase(fetchGroupById.pending, (state) => {
        state.detailStatus = 'loading';
        state.selectedGroup = null;
      })
      .addCase(fetchGroupById.fulfilled, (state, action) => {
        state.detailStatus = 'succeeded';
        state.selectedGroup = action.payload || null;
      })
      .addCase(fetchGroupById.rejected, (state) => {
        state.detailStatus = 'failed';
      });
  },
});

export default groupSlice.reducer;
