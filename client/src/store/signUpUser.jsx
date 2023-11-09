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
    const response = await axios.post("http://c:1128/api/user/add", formData);
    return response.data; 
  } catch (error) {
    alert(error.message, "sign up failed");
    return "Signup failed";
  }
});

const signUpUserSlice = createSlice({
  name: "signUpUser",
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
      state.user = action.payload; 
    });
    builder.addCase(signupUser.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default signUpUserSlice.reducer;