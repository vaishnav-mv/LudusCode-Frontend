import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
import { User } from '../../types';
import { getProfile } from '../../services/authService';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false, // Will be set to true when fetching profile
  error: null,
  isAuthenticated: false, // Will be set to true after successful profile fetch
};

// Async thunk for fetching user profile
export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      // With HTTP-only cookies, token is automatically sent with request
      // No need to check for token existence
      const profile = await getProfile();
      return profile;
    } catch (error: any) {
      const status = error?.response?.status;
      // HTTP-only cookie will be cleared by backend on 401/403
      // or will expire naturally
      return rejectWithValue(error.message || 'Failed to fetch profile');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: User }>) => {
      const { user } = action.payload;
      // Token is set by backend as HTTP-only cookie
      state.user = user;
      state.isAuthenticated = true;
      state.error = null;
    },
    logout: (state) => {
      // Cookie will be cleared by backend logout endpoint
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false; // No valid cookie/session
        state.error = action.payload as string;
      })
      .addCase(PURGE, () => {
        // Reset to initial state when purging (logout)
        return initialState;
      });
  },
});

export const { login, logout, clearError } = authSlice.actions;
export default authSlice.reducer;