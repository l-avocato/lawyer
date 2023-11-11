// signUpSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  lawyer: {},
};

// Async Thunk for Signup
export const signupLawyer = createAsyncThunk(
  "signup/signupLawyer",
  async (formData) => {
    console.log("this is the data", formData);
    try {
      const response = await axios.post(
        "http://localhost:1128/api/lawyer/addLawyer",
        formData
      );
      return response.data;
    } catch (error) {
      alert(error.message, "sign up failed");
      return "Signup failed";
    }
  }
);

const signUpLawyerSlice = createSlice({
  name: "signUpLawyer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signupLawyer.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signupLawyer.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.lawyer = action.payload;
    });
    builder.addCase(signupLawyer.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default signUpLawyerSlice.reducer;
