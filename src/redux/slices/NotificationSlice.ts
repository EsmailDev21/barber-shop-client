import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Notification } from 'src/types/models';
import { RootState } from '../store';
import AuthService from 'src/httpClient/services/AuthService';
import { LoginDTO, SignupDTO } from 'src/types/auth';
import StorageService from 'src/httpClient/services/StorageService';
import UserService from 'src/httpClient/services/UserService';
import ServicesService from 'src/httpClient/services/ServicesService';
import ReviewService from 'src/httpClient/services/ReviewService';
import NotificationService from 'src/httpClient/services/NotificationService';

// Define a type for the slice state
export interface NotificationsState {
  data: Partial<Notification>[];
  isLoading: boolean;
  error: string | null;
}

// Define the initial state using that type
const initialState: NotificationsState = {
  data: [],
  isLoading: false,
  error: null,
};

// Async thunk for registration
export const createNotification = createAsyncThunk(
  'notifications/createNotification',
  async (createData: Partial<Notification>, { rejectWithValue }) => {
    try {
      const service = new NotificationService();
      const data = await service.createRecord(createData);
      return data;
    } catch (error: any) {
      throw error;
    }
  }
);

// Async thunk for banning a user
export const deleteNotification = createAsyncThunk(
  'notifications/deleteNotification',
  async (id: string, { rejectWithValue }) => {
    try {
      const service = new NotificationService();
      const data = await service.deleteRecord(id);
      return data;
    } catch (error: any) {
      throw error;
    }
  }
);

// Async thunk for updating a user
export const updateNotification = createAsyncThunk(
  'notifications/updateNotification',
  async ({ data, id }: { data: Partial<Notification>; id: string }, { rejectWithValue }) => {
    try {
      const service = new NotificationService();
      console.log(id);
      const res = await service.updateRecord(data, id);
      return res;
    } catch (error: any) {
      throw error;
    }
  }
);

// Async thunk for fetching all users
export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, { rejectWithValue, getState }) => {
    try {
      const service = new NotificationService();
      const res = await service.getAllRecords();
      return res;
    } catch (error: any) {
      throw error;
    }
  }
);

// Async thunk for fetching a user by ID
export const fetchNotificationById = createAsyncThunk(
  'notifications/fetchNotificationById',
  async (id: string, { rejectWithValue }) => {
    try {
      const service = new NotificationService();
      const res = await service.getRecordById(id);
      return res;
    } catch (error: any) {
      throw error;
    }
  }
);

export const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setNotifications: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle registerUser
      .addCase(createNotification.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createNotification.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.push(action.payload);
        state.error = null;
      })
      .addCase(createNotification.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Handle banUser
      .addCase(deleteNotification.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteNotification.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.filter((s) => s.id != action.payload.id);
        state.error = null;
      })
      .addCase(deleteNotification.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Handle updateUser
      .addCase(updateNotification.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateNotification.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.map((b) => (b.id === action.payload.id ? action.payload : b));
        state.error = null;
      })
      .addCase(updateNotification.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Handle fetchUsers
      .addCase(fetchNotifications.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Handle fetchUserById
      .addCase(fetchNotificationById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNotificationById.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.data.findIndex((s) => s.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        } else {
          state.data.push(action.payload);
        }
        state.error = null;
      })
      .addCase(fetchNotificationById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
    // Handle fetchUserByLocation
  },
});

export const { clearError, setNotifications } = notificationSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectNotificationState = (state: RootState) => state.notifications;

const notificationReducer = notificationSlice.reducer;
export default notificationReducer;
