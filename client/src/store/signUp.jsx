// signUpSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  user: {},
};

// Async Thunk for Signup
export const signupUser = createAsyncThunk("signup/signupUser", async (formData) => {
  try {
    const response = await axios.post("http://localhost:1128/api/user/add", formData);
    return response.data; // Assuming your API returns user data upon successful signup
  } catch (error) {
    // Handle error and reject the promise with the error message
    return "Signup failed";
  }
});

const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signupUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.user = action.payload; // Fix the property name here
      state.role = action.payload.role;
    });
    builder.addCase(signupUser.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default signUpSlice.reducer;