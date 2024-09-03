import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Report } from 'src/types/models';
import { RootState } from '../store';
import ReportsService from 'src/httpClient/services/ReportsService';

// Define a type for the slice state
export interface ReportsState {
  data: Partial<Report>[];
  isLoading: boolean;
  error: string | null;
}

// Define the initial state using that type
const initialState: ReportsState = {
  data: [],
  isLoading: false,
  error: null,
};

// Async thunk for registration
export const createReport = createAsyncThunk(
  'reports/createReport',
  async (createData: Partial<Report>, { rejectWithValue }) => {
    try {
      const service = new ReportsService();
      const data = await service.createRecord(createData);
      return data;
    } catch (error: any) {
      throw error;
    }
  }
);

// Async thunk for banning a user
export const deleteReport = createAsyncThunk(
  'reports/deleteReport',
  async (id: string, { rejectWithValue }) => {
    try {
      const service = new ReportsService();
      const data = await service.deleteRecord(id);
      return data;
    } catch (error: any) {
      throw error;
    }
  }
);

// Async thunk for updating a user
export const updateReport = createAsyncThunk(
  'reports/updateReport',
  async ({ data, id }: { data: Partial<Report>; id: string }, { rejectWithValue }) => {
    try {
      const service = new ReportsService();
      console.log(id);
      const res = await service.updateRecord(data, id);
      return res;
    } catch (error: any) {
      throw error;
    }
  }
);

// Async thunk for fetching all users
export const fetchReports = createAsyncThunk(
  'reports/fetchReports',
  async (_, { rejectWithValue, getState }) => {
    try {
      const service = new ReportsService();
      const res = await service.getAllRecords();
      return res;
    } catch (error: any) {
      throw error;
    }
  }
);

// Async thunk for fetching a user by ID
export const fetchReportById = createAsyncThunk(
  'reports/fetchReportById',
  async (id: string, { rejectWithValue }) => {
    try {
      const service = new ReportsService();
      const res = await service.getRecordById(id);
      return res;
    } catch (error: any) {
      throw error;
    }
  }
);

export const reportsSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle registerUser
      .addCase(createReport.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.push(action.payload);
        state.error = null;
      })
      .addCase(createReport.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Handle banUser
      .addCase(deleteReport.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.filter((s) => s.id != action.payload.id);
        state.error = null;
      })
      .addCase(deleteReport.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Handle updateUser
      .addCase(updateReport.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.map((b) => (b.id === action.payload.id ? action.payload : b));
        state.error = null;
      })
      .addCase(updateReport.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Handle fetchUsers
      .addCase(fetchReports.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchReports.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchReports.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Handle fetchUserById
      .addCase(fetchReportById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchReportById.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.data.findIndex((s) => s.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        } else {
          state.data.push(action.payload);
        }
        state.error = null;
      })
      .addCase(fetchReportById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
    // Handle fetchUserByLocation
  },
});

export const { clearError } = reportsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectReportsState = (state: RootState) => state.reports;

const reportsReducer = reportsSlice.reducer;
export default reportsReducer;
