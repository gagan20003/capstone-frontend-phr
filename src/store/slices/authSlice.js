import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login as loginApi, signup as signupApi } from '../../api/apiService';

// Check if user is logged in on initial load
const getInitialAuthState = () => {
  const token = localStorage.getItem('auth_token');
  const userDetails = localStorage.getItem('user_details');
  return {
    token: token || null,
    isLoggedIn: !!token,
    loading: false,
    userDetails: userDetails ? JSON.parse(userDetails) : null,
    error: null,
  };
};

// Async thunk for login
export const login = createAsyncThunk(
  'auth/login',
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await loginApi(loginData);
      const token = response?.token || response?.data?.token || response?.access_token;
      const userDetails = response?.userDetails ;
      if (token) {
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user_details', JSON.stringify(userDetails));
        return { token, userDetails };
      }
      throw new Error('Token not found in response');
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Login failed'
      );
    }
  }
);

// Async thunk for signup
export const signup = createAsyncThunk(
  'auth/signup',
  async (signupData, { rejectWithValue }) => {
    try {
      const response = await signupApi(signupData);
      // Some APIs return token on signup, others require login after signup
      const token = response?.token || response?.data?.token || response?.access_token;
      if (token) {
        localStorage.setItem('auth_token', token);
        return { token };
      }
      // If no token, signup was successful but user needs to login
      return { token: null, requiresLogin: true };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Signup failed'
      );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialAuthState(),
  reducers: {
    logout: (state) => {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_details');
      state.token = null;
      state.isLoggedIn = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.userDetails = action.payload.userDetails;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isLoggedIn = false;
      })
      // Signup cases
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.token) {
          state.token = action.payload.token;
          state.isLoggedIn = true;
        }
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;

