import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Review, Service, User } from 'src/types/models';
import { RootState } from '../store';
import AuthService from 'src/httpClient/services/AuthService';
import { LoginDTO, SignupDTO } from 'src/types/auth';
import StorageService from 'src/httpClient/services/StorageService';
import UserService from 'src/httpClient/services/UserService';
import ServicesService from 'src/httpClient/services/ServicesService';
import ReviewService from 'src/httpClient/services/ReviewService';

// Define a type for the slice state
export interface ReviewsState {
  data: Partial<Review>[];
  isLoading: boolean;
  error: string | null;
}

// Define the initial state using that type
const initialState: ReviewsState = {
  data: [],
  isLoading: false,
  error: null,
};

// Async thunk for registration
export const createReview = createAsyncThunk(
  'reviews/createReview',
  async (createData: Partial<Review>, { rejectWithValue }) => {
    try {
      const service = new ReviewService();
      const data = await service.createRecord(createData);
      return data;
    } catch (error: any) {
      throw error;
    }
  }
);

// Async thunk for banning a user
export const deleteReview = createAsyncThunk(
  'reviews/deleteReview',
  async (id: string, { rejectWithValue }) => {
    try {
      const service = new ReviewService();
      const data = await service.deleteRecord(id);
      return data;
    } catch (error: any) {
      throw error;
    }
  }
);

// Async thunk for updating a user
export const updateReview = createAsyncThunk(
  'reviews/updateReview',
  async ({ data, id }: { data: Partial<Review>; id: string }, { rejectWithValue }) => {
    try {
      const service = new ReviewService();
      const id = data.id;
      const res = await service.updateRecord(data, id);
      return res;
    } catch (error: any) {
      throw error;
    }
  }
);

// Async thunk for fetching all users
export const fetchReviews = createAsyncThunk(
  'reviews/fetchReviews',
  async (_, { rejectWithValue, getState }) => {
    try {
      const service = new ReviewService();
      const res = await service.getAllRecords();
      return res;
    } catch (error: any) {
      throw error;
    }
  }
);

// Async thunk for fetching a user by ID
export const fetchReviewById = createAsyncThunk(
  'reviews/fetchReviewById',
  async (id: string, { rejectWithValue }) => {
    try {
      const service = new ReviewService();
      const res = await service.getRecordById(id);
      return res;
    } catch (error: any) {
      throw error;
    }
  }
);

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle registerUser
      .addCase(createReview.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.push(action.payload);
        state.error = null;
      })
      .addCase(createReview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Handle banUser
      .addCase(deleteReview.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.filter((s) => s.id != action.payload.id);
        state.error = null;
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Handle updateUser
      .addCase(updateReview.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.map((service) =>
          service.id === action.payload.id ? action.payload : service
        );
        state.error = null;
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Handle fetchUsers
      .addCase(fetchReviews.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Handle fetchUserById
      .addCase(fetchReviewById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchReviewById.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.data.findIndex((s) => s.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        } else {
          state.data.push(action.payload);
        }
        state.error = null;
      })
      .addCase(fetchReviewById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
    // Handle fetchUserByLocation
  },
});

export const { clearError } = reviewsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectReviewsState = (state: RootState) => state.reviews;

const reviewsReducer = reviewsSlice.reducer;
export default reviewsReducer;
