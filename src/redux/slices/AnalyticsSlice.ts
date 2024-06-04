import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import AnalyticsService from 'src/httpClient/services/AnalyticsService';

// Define a type for the slice state
export interface AnalyticsState {
  data: {
    numberOfUser: number;
    numberOfCustomers: number;
    numberOfBarbers: number;
    totalSales: number;
    monthlySales: object;
    weeklySales: object;
    topServices: { serviceName: string; revenue: number }[];
    customerInsights: {
      customerId: string;
      name: string;
      totalSpent: number;
      bookingCount: number;
    }[];
    serviceRatings: { serviceName: string; averageRating: number; totalRatings: number }[];
    bookingTrends: {
      dailyBookings: object;
      weeklyBookings: object;
      monthlyBookings: object;
      hourlyBookings: object;
    };
    barbersPerformance: {
      barberId: string;
      name: string;
      totalRevenue: number;
      totalBookings: number;
      averageRating: number;
      totalReviews: number;
    }[];
    serviceGenderTypes: { genderType: string; count: number }[];
  } | null;
  isLoading: boolean;
  error: string | null;
}

// Define the initial state using that type
const initialState: AnalyticsState = {
  data: {
    barbersPerformance: [],
    bookingTrends: {
      dailyBookings: {},
      hourlyBookings: {},
      monthlyBookings: {},
      weeklyBookings: {},
    },
    numberOfUser: 0,
    numberOfCustomers: 0,
    numberOfBarbers: 0,
    totalSales: 0,
    monthlySales: {},
    weeklySales: {},
    topServices: [],
    customerInsights: [],
    serviceRatings: [],
    serviceGenderTypes: [],
  },
  isLoading: false,
  error: null,
};

// Async thunks for fetching analytics data
export const fetchNumberOfUsers = createAsyncThunk(
  'analytics/numberOfUsers',
  async (_, { rejectWithValue }) => {
    try {
      const service = new AnalyticsService();
      const data = await service.numberOfUsers();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchNumberOfBarbers = createAsyncThunk(
  'analytics/numberOfBarbers',
  async (_, { rejectWithValue }) => {
    try {
      const service = new AnalyticsService();
      const data = await service.numberOfBarbers();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchNumberOfCustomers = createAsyncThunk(
  'analytics/numberOfCustomers',
  async (_, { rejectWithValue }) => {
    try {
      const service = new AnalyticsService();
      const data = await service.numberOfCustomers();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTotalSales = createAsyncThunk(
  'analytics/totalSales',
  async (_, { rejectWithValue }) => {
    try {
      const service = new AnalyticsService();
      const data = await service.totalSales();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchMonthlySales = createAsyncThunk(
  'analytics/monthlySales',
  async (_, { rejectWithValue }) => {
    try {
      const service = new AnalyticsService();
      const data = await service.monthlySales();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchWeeklySales = createAsyncThunk(
  'analytics/weeklySales',
  async (_, { rejectWithValue }) => {
    try {
      const service = new AnalyticsService();
      const data = await service.weeklySales();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTopServices = createAsyncThunk(
  'analytics/topServices',
  async (_, { rejectWithValue }) => {
    try {
      const service = new AnalyticsService();
      const data = await service.topServices();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCustomerInsights = createAsyncThunk(
  'analytics/customerInsights',
  async (_, { rejectWithValue }) => {
    try {
      const service = new AnalyticsService();
      const data = await service.customerInsights();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchServiceRatings = createAsyncThunk(
  'analytics/serviceRatings',
  async (_, { rejectWithValue }) => {
    try {
      const service = new AnalyticsService();
      const data = await service.serviceRatings();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchBookingTrends = createAsyncThunk(
  'analytics/bookingTrends',
  async (_, { rejectWithValue }) => {
    try {
      const service = new AnalyticsService();
      const data = await service.bookingTrends();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchBarbersPerformance = createAsyncThunk(
  'analytics/barbersPerformance',
  async (_, { rejectWithValue }) => {
    try {
      const service = new AnalyticsService();
      const data = await service.barbersPerformance();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchServiceGenderTypes = createAsyncThunk(
  'analytics/serviceGenderTypes',
  async (_, { rejectWithValue }) => {
    try {
      const service = new AnalyticsService();
      const data = await service.serviceGenderType();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle numberOfUsers
      .addCase(fetchNumberOfUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNumberOfUsers.fulfilled, (state, action: PayloadAction<number>) => {
        state.isLoading = false;
        if (state.data) {
          state.data.numberOfUser = action.payload;
        } else {
          state.data = { ...initialState.data, numberOfUser: action.payload };
        }
      })
      .addCase(fetchNumberOfUsers.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Handle numberOfBarbers
      .addCase(fetchNumberOfBarbers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNumberOfBarbers.fulfilled, (state, action: PayloadAction<number>) => {
        state.isLoading = false;
        if (state.data) {
          state.data.numberOfBarbers = action.payload;
        } else {
          state.data = { ...initialState.data, numberOfBarbers: action.payload };
        }
      })
      .addCase(fetchNumberOfBarbers.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Handle numberOfCustomers
      .addCase(fetchNumberOfCustomers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNumberOfCustomers.fulfilled, (state, action: PayloadAction<number>) => {
        state.isLoading = false;
        if (state.data) {
          state.data.numberOfCustomers = action.payload;
        } else {
          state.data = { ...initialState.data, numberOfCustomers: action.payload };
        }
      })
      .addCase(fetchNumberOfCustomers.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Handle totalSales
      .addCase(fetchTotalSales.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTotalSales.fulfilled, (state, action: PayloadAction<number>) => {
        state.isLoading = false;
        if (state.data) {
          state.data.totalSales = action.payload;
        } else {
          state.data = { ...initialState.data, totalSales: action.payload };
        }
      })
      .addCase(fetchTotalSales.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Handle monthlySales
      .addCase(fetchMonthlySales.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMonthlySales.fulfilled, (state, action: PayloadAction<object>) => {
        state.isLoading = false;
        if (state.data) {
          state.data.monthlySales = action.payload;
        } else {
          state.data = { ...initialState.data, monthlySales: action.payload };
        }
      })
      .addCase(fetchMonthlySales.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Handle weeklySales
      .addCase(fetchWeeklySales.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWeeklySales.fulfilled, (state, action: PayloadAction<object>) => {
        state.isLoading = false;
        if (state.data) {
          state.data.weeklySales = action.payload;
        } else {
          state.data = { ...initialState.data, weeklySales: action.payload };
        }
      })
      .addCase(fetchWeeklySales.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Handle topServices
      .addCase(fetchTopServices.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchTopServices.fulfilled,
        (state, action: PayloadAction<{ serviceName: string; revenue: number }[]>) => {
          state.isLoading = false;
          if (state.data) {
            state.data.topServices = action.payload;
          } else {
            state.data = { ...initialState.data, topServices: action.payload };
          }
        }
      )
      .addCase(fetchTopServices.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Handle customerInsights
      .addCase(fetchCustomerInsights.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchCustomerInsights.fulfilled,
        (
          state,
          action: PayloadAction<
            { customerId: string; name: string; totalSpent: number; bookingCount: number }[]
          >
        ) => {
          state.isLoading = false;
          if (state.data) {
            state.data.customerInsights = action.payload;
          } else {
            state.data = { ...initialState.data, customerInsights: action.payload };
          }
        }
      )
      .addCase(fetchCustomerInsights.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Handle serviceRatings
      .addCase(fetchServiceRatings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchServiceRatings.fulfilled,
        (
          state,
          action: PayloadAction<
            { serviceName: string; averageRating: number; totalRatings: number }[]
          >
        ) => {
          state.isLoading = false;
          if (state.data) {
            state.data.serviceRatings = action.payload;
          } else {
            state.data = { ...initialState.data, serviceRatings: action.payload };
          }
        }
      )
      .addCase(fetchServiceRatings.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Handle bookingTrends
      .addCase(fetchBookingTrends.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBookingTrends.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        if (state.data) {
          state.data.bookingTrends = action.payload;
        } else {
          state.data = { ...initialState.data, bookingTrends: action.payload };
        }
      })
      .addCase(fetchBookingTrends.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Handle barbersPerformance
      .addCase(fetchBarbersPerformance.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchBarbersPerformance.fulfilled,
        (
          state,
          action: PayloadAction<
            {
              barberId: string;
              name: string;
              totalRevenue: number;
              totalBookings: number;
              averageRating: number;
              totalReviews: number;
            }[]
          >
        ) => {
          state.isLoading = false;
          if (state.data) {
            state.data.barbersPerformance = action.payload;
          } else {
            state.data = { ...initialState.data, barbersPerformance: action.payload };
          }
        }
      )
      .addCase(fetchBarbersPerformance.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchServiceGenderTypes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchServiceGenderTypes.fulfilled,
        (
          state,
          action: PayloadAction<
            {
              genderType: string;
              count: number;
            }[]
          >
        ) => {
          state.isLoading = false;
          if (state.data) {
            state.data.serviceGenderTypes = action.payload;
          } else {
            state.data = { ...initialState.data, serviceGenderTypes: action.payload };
          }
        }
      )
      .addCase(fetchServiceGenderTypes.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = analyticsSlice.actions;

// Selectors
export const selectAnalyticsState = (state: RootState) => state.analytics;

const analyticsReducer = analyticsSlice.reducer;
export default analyticsReducer;
