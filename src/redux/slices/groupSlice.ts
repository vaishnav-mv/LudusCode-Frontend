// redux/slices/groupSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Group } from '../../models';
import { getGroups, getGroupById } from '../../services/groupService';

interface GroupState {
  groups: Group[];
  selectedGroup: Group | null;
  listStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  detailStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: GroupState = {
  groups: [],
  selectedGroup: null,
  listStatus: 'idle',
  detailStatus: 'idle',
};

export const fetchGroups = createAsyncThunk('groups/fetchGroups', async () => {
  const groups = await getGroups();
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
