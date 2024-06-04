import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Booking, ReservationStatus, Review, Service, User } from 'src/types/models';
import { RootState } from '../store';
import AuthService from 'src/httpClient/services/AuthService';
import { LoginDTO, SignupDTO } from 'src/types/auth';
import StorageService from 'src/httpClient/services/StorageService';
import UserService from 'src/httpClient/services/UserService';
import ServicesService from 'src/httpClient/services/ServicesService';
import ReviewService from 'src/httpClient/services/ReviewService';
import BookingService from 'src/httpClient/services/BookingService';

// Define a type for the slice state
export interface BookingsState {
  data: Partial<Booking>[];
  isLoading: boolean;
  error: string | null;
}

// Define the initial state using that type
const initialState: BookingsState = {
  data: [],
  isLoading: false,
  error: null,
};

// Async thunk for registration
export const createBooking = createAsyncThunk(
  'bookings/createBooking',
  async (createData: Partial<Booking>, { rejectWithValue }) => {
    try {
      const service = new BookingService();
      const data = await service.createRecord(createData);
      return data;
    } catch (error: any) {
      throw error;
    }
  }
);

// Async thunk for banning a user
export const deleteBooking = createAsyncThunk(
  'bookings/deleteBooking',
  async (id: string, { rejectWithValue }) => {
    try {
      const service = new BookingService();
      const data = await service.deleteRecord(id);
      return data;
    } catch (error: any) {
      throw error;
    }
  }
);

// Async thunk for updating a user
export const updateBooking = createAsyncThunk(
  'bookings/updateBooking',
  async ({ data, id }: { data: Partial<Booking>; id: string }, { rejectWithValue }) => {
    try {
      const service = new BookingService();
      console.log(id);
      const res = await service.updateRecord(data, id);
      return res;
    } catch (error: any) {
      throw error;
    }
  }
);

export const changeBookingStatus = createAsyncThunk(
  'bookings/changeBookingStatus',
  async (
    { data, id }: { data: { status: ReservationStatus }; id: string },
    { rejectWithValue }
  ) => {
    try {
      const service = new BookingService();
      console.log(id);
      const res = await service.updateStatus(data, id);
      return res;
    } catch (error: any) {
      throw error;
    }
  }
);

// Async thunk for fetching all users
export const fetchBookings = createAsyncThunk(
  'bookings/fetchBookings',
  async (_, { rejectWithValue, getState }) => {
    try {
      const service = new BookingService();
      const res = await service.getAllRecords();
      return res;
    } catch (error: any) {
      throw error;
    }
  }
);

// Async thunk for fetching a user by ID
export const fetchBookingById = createAsyncThunk(
  'bookings/fetchBookingById',
  async (id: string, { rejectWithValue }) => {
    try {
      const service = new BookingService();
      const res = await service.getRecordById(id);
      return res;
    } catch (error: any) {
      throw error;
    }
  }
);

export const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle registerUser
      .addCase(createBooking.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.push(action.payload);
        state.error = null;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Handle banUser
      .addCase(deleteBooking.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.filter((s) => s.id != action.payload.id);
        state.error = null;
      })
      .addCase(deleteBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Handle updateUser
      .addCase(updateBooking.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.map((b) => (b.id === action.payload.id ? action.payload : b));
        state.error = null;
      })
      .addCase(updateBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(changeBookingStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(changeBookingStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.map((b) => (b.id === action.payload.id ? action.payload : b));
        state.error = null;
      })
      .addCase(changeBookingStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Handle fetchUsers
      .addCase(fetchBookings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Handle fetchUserById
      .addCase(fetchBookingById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBookingById.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.data.findIndex((s) => s.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        } else {
          state.data.push(action.payload);
        }
        state.error = null;
      })
      .addCase(fetchBookingById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
    // Handle fetchUserByLocation
  },
});

export const { clearError } = bookingsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectBookingsState = (state: RootState) => state.bookings;

const bookingsReducer = bookingsSlice.reducer;
export default bookingsReducer;
