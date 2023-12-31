// signUpSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../screens/ipv";

const initialState = {
  loading: false,
  error: null,
  user: {},
};

// Async Thunk for Signup
export const signupUser = createAsyncThunk("signup/signupUser", async (input, { dispatch }) => {
    // console.log(input,'this is the body');
    // console.log(process.env.IPV_IP,"logged");
    try {
   const response = await axios.post(`http://${config}:1128/api/user/addUser`, input);
   console.log(response.data,"this is from the store");
return response.data
  } catch (error) {
    console.log(error);
  }
}
  );
  

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