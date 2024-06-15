import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Service, User } from 'src/types/models';
import { RootState } from '../store';
import AuthService from 'src/httpClient/services/AuthService';
import { LoginDTO, SignupDTO } from 'src/types/auth';
import StorageService from 'src/httpClient/services/StorageService';
import UserService from 'src/httpClient/services/UserService';
import ServicesService from 'src/httpClient/services/ServicesService';

// Define a type for the slice state
export interface ServicesState {
  data: Partial<Service>[];
  isLoading: boolean;
  error: string | null;
  currentService: Partial<Service> | null;
}

// Define the initial state using that type
const initialState: ServicesState = {
  data: [],
  isLoading: false,
  error: null,
  currentService: null,
};

// Async thunk for registration
export const createService = createAsyncThunk(
  'services/createService',
  async (createData: Partial<Service>, { rejectWithValue }) => {
    try {
      const service = new ServicesService();
      const data = await service.createRecord(createData);
      return data;
    } catch (error: any) {
      throw error;
    }
  }
);

// Async thunk for banning a user
export const deleteService = createAsyncThunk(
  'services/deleteService',
  async (id: string, { rejectWithValue }) => {
    try {
      const service = new ServicesService();
      const data = await service.deleteRecord(id);
      return data;
    } catch (error: any) {
      throw error;
    }
  }
);

// Async thunk for updating a user
export const updateService = createAsyncThunk(
  'services/updateService',
  async ({ data, id }: { data: Partial<Service>; id: string }, { rejectWithValue }) => {
    try {
      const service = new ServicesService();
      const id = data.id;
      const res = await service.updateRecord(data, id);
      return res;
    } catch (error: any) {
      throw error;
    }
  }
);

// Async thunk for fetching all users
export const fetchServices = createAsyncThunk(
  'services/fetchServices',
  async (_, { rejectWithValue, getState }) => {
    try {
      const service = new ServicesService();
      const res = await service.getAllRecords();
      return res;
    } catch (error: any) {
      throw error;
    }
  }
);

// Async thunk for fetching a user by ID
export const fetchServiceById = createAsyncThunk(
  'services/fetchServiceById',
  async (id: string, { rejectWithValue }) => {
    try {
      const service = new ServicesService();
      const res = await service.getRecordById(id);
      return res;
    } catch (error: any) {
      throw error;
    }
  }
);
export const uploadServiceImage = createAsyncThunk(
  'services/uploadServiceImage',
  async (fileData: { file: any }, { rejectWithValue }) => {
    try {
      const storageService = new StorageService();
      const data = await storageService.upload(fileData);
      return data;
    } catch (error: any) {
      console.log(error);
      throw error;
    }
  }
);

// Async thunk for filtering services by price range
export const filterByPriceRange = createAsyncThunk(
  'services/filterByPriceRange',
  async ({ min, max }: { min: number; max: number }, { rejectWithValue }) => {
    try {
      const service = new ServicesService();
      const res = await service.filterByPriceRange(min, max);
      return res;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk for filtering services by rating
export const filterByRating = createAsyncThunk(
  'services/filterByRating',
  async (rating: number, { rejectWithValue }) => {
    try {
      const service = new ServicesService();
      const res = await service.filterByRating(rating);
      return res;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk for filtering services by genders
export const filterByGenders = createAsyncThunk(
  'services/filterByGenders',
  async (genders: ('KID' | 'MALE' | 'FEMALE')[], { rejectWithValue }) => {
    try {
      const service = new ServicesService();
      const res = await service.filterByGenders(genders);
      return res;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setServices: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle registerUser
      .addCase(createService.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.push(action.payload);
        state.error = null;
      })
      .addCase(createService.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Handle banUser
      .addCase(deleteService.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.filter((s) => s.id != action.payload.id);
        state.error = null;
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Handle updateUser
      .addCase(updateService.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.map((service) =>
          service.id === action.payload.id ? action.payload : service
        );
        state.error = null;
      })
      .addCase(updateService.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Handle fetchUsers
      .addCase(fetchServices.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Handle fetchUserById
      .addCase(fetchServiceById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchServiceById.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.data.findIndex((s) => s.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        } else {
          state.data.push(action.payload);
        }
        state.currentService = action.payload;
        state.error = null;
      })
      .addCase(fetchServiceById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(uploadServiceImage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(uploadServiceImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentService = {
          ...state.data,
          imageUrl: action.payload.url,
        };
        state.error = null;
      })
      .addCase(uploadServiceImage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(filterByPriceRange.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(filterByPriceRange.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(filterByPriceRange.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to filter services by price range';
      })
      // Handle filterByRating
      .addCase(filterByRating.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(filterByRating.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(filterByRating.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to filter services by rating';
      })
      // Handle filterByGenders
      .addCase(filterByGenders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(filterByGenders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(filterByGenders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to filter services by genders';
      });
    // Handle fetchUserByLocation
  },
});

export const { clearError, setServices } = servicesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectServicesState = (state: RootState) => state.services;

const servicesReducer = servicesSlice.reducer;
export default servicesReducer;
