import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, registerApi } from "../../api/auth";
import { submitVisaApplicationFormApi } from "@/api/visa";
import {
  setTokenExpirationTimeout,
  clearTokenExpirationTimeout,
} from "../utils/tokenUtils";

import httpService from "@/api/httpService";
// Thunks for async actions

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await loginApi(credentials);
      const token = response.data.access;

      // Parse token to extract expiration time
      const { exp } = JSON.parse(atob(token.split(".")[1]));

      // Set token expiration timeout
      setTokenExpirationTimeout(thunkAPI.dispatch, exp);

      return response.data; // Return the response data directly
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "auth/registration",
  async (userInfo, thunkAPI) => {
    try {
      const response = await registerApi(userInfo);

      const token = response.data.token;

      // Parse token to extract expiration time
      const { exp } = JSON.parse(atob(token.split(".")[1]));

      // Set token expiration timeout
      setTokenExpirationTimeout(thunkAPI.dispatch, exp);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Thunk for submitting visa application form
export const submitVisaApplication = createAsyncThunk(
  "auth/submitVisaApplication",
  async ({ visaFormInfo, token }, thunkAPI) => {
    try {
      console.log("visaFormInfo from authSlice", visaFormInfo);
      console.log("Token inside submitVisaApplication", token);

      const response = await submitVisaApplicationFormApi(visaFormInfo, token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    refreshToken: null, // Add refresh token to the initialState
    status: "idle",
    error: null,
    currentCountryForms: null, // To manage currentCountry forms
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null; // Clear refresh token on logout
      state.status = "idle";
      state.error = null;
      state.currentCountry = null;
      clearTokenExpirationTimeout(); // Clear the expiration timeout on logout
    },
    setCurrentCountryForms: (state, action) => {
      state.currentCountryForms = action.payload; // Set the forms data
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user; // Store user info
        state.token = action.payload.access; // Store access token
        state.refreshToken = action.payload.refresh; // Store refresh token
        state.currentCountry = action.payload.user.resident_country; // Optionally set currentCountry
      })

      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.access;
        state.refreshToken = action.payload.refresh;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(submitVisaApplication.pending, (state) => {
        state.status = "loading";
      })
      .addCase(submitVisaApplication.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentCountryForms = action.payload.currentCountryForms;
        // Handle successful form submission (e.g., clear form data or show a success message)
      })
      .addCase(submitVisaApplication.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout, setCurrentCountryForms } = authSlice.actions;
export default authSlice.reducer;
