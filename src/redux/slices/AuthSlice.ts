import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'src/types/models';
import { RootState } from '../store';
import AuthService from 'src/httpClient/services/AuthService';
import { LoginDTO, SignupDTO } from 'src/types/auth';
import StorageService from 'src/httpClient/services/StorageService';
import UserService from 'src/httpClient/services/UserService';
import { decodeToken } from 'react-jwt';

// Define a type for the slice state
export interface AuthState {
  data: Partial<User>;
  isLoading: boolean;
  error: string;
  isLoadingUploadPhoto: boolean;
  isLoadingUpdateProfile: boolean;
}

// Define the initial state using that type
const initialState: AuthState = {
  data: {
    address: '',
    city: '',
    email: '',
    id: '',
    isBanned: false,
    name: '',
    phoneNumber: null,
    role: 'CUSTOMER',
    specialNote: '',
    photoUrl: '',
  },
  isLoading: false,
  error: '',

  isLoadingUploadPhoto: false,
  isLoadingUpdateProfile: false,
};

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: LoginDTO, { rejectWithValue }) => {
    try {
      console.log(credentials);
      const authService = new AuthService();
      const data = await authService.login(credentials);
      return data;
    } catch (error: any) {
      throw error;
    }
  }
);

// Async thunk for registration
export const registerUser = createAsyncThunk(
  'auth/registerUser',
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
export const uploadProfilePicture = createAsyncThunk(
  'auth/uploadProfilePicture',
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

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (data: Partial<User> | User, { rejectWithValue }) => {
    try {
      const userService = new UserService();
      const id = localStorage.getItem('USER_ID');
      const res = await userService.updateRecord(data, id);
      return res;
    } catch (error: any) {
      throw error;
    }
  }
);

export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState; // Assuming you have authToken in state.auth.data
      const authService = new AuthService();
      const res = await authService.getProfile();
      return res;
    } catch (error: any) {
      throw error;
    }
  }
);
export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setUser: (state, action: PayloadAction<User>) => {
      state.data = action.payload;
    },
    startLoading: (state) => {
      state.isLoading = true;
    },
    endLoading: (state) => {
      state.isLoading = false;
    },
    setUserNotFoundError: (state) => {
      state.error = 'User not found!';
    },
    setUserUnaothorizedError: (state) => {
      state.error = 'You are not Authorized!';
    },
    setUserNotLoggedInError: (state) => {
      state.error = 'You are not not logged in!';
    },
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.data = null;
      state.error = null;
      state.isLoading = false;
      localStorage.removeItem('AUTH_TOKEN');
      localStorage.removeItem('USER_ID');
    },
  },

  extraReducers: (builder) => {
    builder
      // Login reducers
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        localStorage.setItem('AUTH_TOKEN', action.payload.access_token);
        localStorage.setItem('USER_ID', decodeToken(action.payload.access_token).sub);
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Registration reducers
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        localStorage.setItem('USER_ID', action.payload.id);
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(uploadProfilePicture.pending, (state) => {
        state.isLoadingUploadPhoto = true;
        state.error = null;
      })
      .addCase(uploadProfilePicture.fulfilled, (state, action) => {
        state.isLoadingUploadPhoto = false;
        state.data = {
          ...state.data,
          photoUrl: action.payload.url,
        };
        state.error = null;
      })
      .addCase(uploadProfilePicture.rejected, (state, action) => {
        state.isLoadingUploadPhoto = false;
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoadingUpdateProfile = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoadingUpdateProfile = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoadingUpdateProfile = false;
        state.error = action.error.message;
      })
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setUser,
  endLoading,
  setUserNotFoundError,
  setUserNotLoggedInError,
  setUserUnaothorizedError,
  startLoading,
  logout,
  clearError,
} = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAuthState = (state: RootState) => state.auth;

const authReducer = authSlice.reducer;
export default authReducer;
