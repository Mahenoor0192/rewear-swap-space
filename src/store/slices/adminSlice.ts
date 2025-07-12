
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import adminService from '../../services/adminService';

interface User {
  id: string;
  name: string;
  email: string;
  phone_number?: string;
  address?: string;
  is_enabled: boolean;
  created_at: string;
  items_count: number;
  purchases_count: number;
}

interface AdminState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: AdminState = {
  users: [],
  loading: false,
  error: null
};

// Async thunks
export const fetchAllUsers = createAsyncThunk(
  'admin/fetchAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      const users = await adminService.getAllUsers();
      return users;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch users');
    }
  }
);

export const toggleUserStatus = createAsyncThunk(
  'admin/toggleUserStatus',
  async ({ userId, isEnabled }: { userId: string; isEnabled: boolean }, { rejectWithValue }) => {
    try {
      await adminService.updateUserStatus(userId, isEnabled);
      return { userId, isEnabled };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update user status');
    }
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all users
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Toggle user status
      .addCase(toggleUserStatus.fulfilled, (state, action) => {
        const { userId, isEnabled } = action.payload;
        const user = state.users.find(u => u.id === userId);
        if (user) {
          user.is_enabled = isEnabled;
        }
      })
      .addCase(toggleUserStatus.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  }
});

export const { clearError } = adminSlice.actions;
export default adminSlice.reducer;
