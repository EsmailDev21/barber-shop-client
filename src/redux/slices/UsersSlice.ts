import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'src/types/models';
import { RootState } from '../store';
import AuthService from 'src/httpClient/services/AuthService';
import { LoginDTO, SignupDTO } from 'src/types/auth';
import StorageService from 'src/httpClient/services/StorageService';
import UserService from 'src/httpClient/services/UserService';

// Define a type for the slice state
export interface UsersState {
  data: Partial<User>[];
  isLoading: boolean;
  error: string | null;
  currentUser: Partial<User> | null;
}

// Define the initial state using that type
const initialState: UsersState = {
  data: [],
  isLoading: false,
  error: null,
  currentUser: null,
};

// Async thunk for registration
export const registerUser = createAsyncThunk(
  'users/registerUser',
  async (userData: SignupDTO, { rejectWithValue }) => {
    try {
      const authService = new AuthService();
      const data = await authService.register(userData);
      return data;
    } catch (error: any) {
      throw error;
    }
  }
);

// Async thunk for banning a user
export const banUser = createAsyncThunk(
  'users/banUser',
  async (id: string, { rejectWithValue }) => {
    try {
      const userService = new UserService();
      const data = await userService.banUser(id);
      return data;
    } catch (error: any) {
      throw error;
    }
  }
);

// Async thunk for banning a user
export const unbanUser = createAsyncThunk(
  'users/unbanUser',
  async (id: string, { rejectWithValue }) => {
    try {
      const userService = new UserService();
      const data = await userService.unbanUser(id);
      return data;
    } catch (error: any) {
      throw error;
    }
  }
);
// Async thunk for updating a user
export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ data, id }: { data: Partial<User>; id: string }, { rejectWithValue }) => {
    try {
      const userService = new UserService();
      const id = data.id;
      const res = await userService.updateRecord(data, id);
      return res;
    } catch (error: any) {
      throw error;
    }
  }
);

// Async thunk for fetching all users
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue, getState }) => {
    try {
      const service = new UserService();
      const res = await service.getAllRecords();
      return res;
    } catch (error: any) {
      throw error;
    }
  }
);

// Async thunk for fetching a user by ID
export const fetchUserById = createAsyncThunk(
  'users/fetchUserById',
  async (id: string, { rejectWithValue }) => {
    try {
      const service = new UserService();
      const res = await service.getRecordById(id);
      return res;
    } catch (error: any) {
      throw error;
    }
  }
);

// Async thunk for fetching users by location
export const fetchUserByLocation = createAsyncThunk(
  'users/fetchUserByLocation',
  async (location: { city?: string; address?: string }, { rejectWithValue }) => {
    try {
      const service = new UserService();
      const res = await service.getBarbersByLocation(location);
      return res;
    } catch (error: any) {
      throw error;
    }
  }
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle registerUser
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.push(action.payload);
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Handle banUser
      .addCase(banUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(banUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.map((user) =>
          user.id === action.payload.id ? { ...user, isBanned: true } : user
        );
        state.error = null;
      })
      .addCase(banUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Handle updateUser
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.map((user) =>
          user.id === action.payload.id ? action.payload : user
        );
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Handle fetchUsers
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Handle fetchUserById
      .addCase(fetchUserById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.data.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        } else {
          state.data.push(action.payload);
        }
        state.currentUser = action.payload;
        state.error = null;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Handle fetchUserByLocation
      .addCase(fetchUserByLocation.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserByLocation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchUserByLocation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(unbanUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(unbanUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.map((user) =>
          user.id === action.payload.id ? { ...user, isBanned: false } : user
        );
        state.error = null;
      })
      .addCase(unbanUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearError } = usersSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUsersState = (state: RootState) => state.users;

const usersReducer = usersSlice.reducer;
export default usersReducer;
