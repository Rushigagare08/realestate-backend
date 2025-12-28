import { createSlice } from "@reduxjs/toolkit";
import { deleteUser } from "firebase/auth";

const initialState = {
  currentUser: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    signInSuccess: (state, action) => {
      state.currentUser = action.payload; // MUST contain accessToken
      state.loading = false;
      state.error = null;
    },

    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    signOutSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },

    updateUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },

    updateUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;


    },

    deleteUserStart:(state)=>{
      state.loading=true;

    },
    deleteUserSuccess:(state)=>{
      state.currentUser=null;
      state.loading=false;
      state.error=null;
    },
    deleteUserFailure:(state,action)=>{
      state.error=state.payload;
      state.loading=false;
    },
    signOutStart:(state)=>{
      state.loading=true;
    },
    
      signOutUserSuccess:(state)=>{
        state.currentUser=null;
        state.loading=false;
        state.error=null;
      },
      signOutUserFailure:(state,action)=>{
        state.error=action.payload;
        state.loading=false;
      }
    

  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  signOutSuccess,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutStart,
  signOutUserFailure,
  signOutUserSuccess,
} = userSlice.actions;

export default userSlice.reducer;
