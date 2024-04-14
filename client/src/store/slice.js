import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // to indicate whether a user is logged in or not
};

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setUser: (state, action) => { // reducer for setting up the status of user
      state.user = action.payload;
    },
  },
});

export const { setUser } = eventSlice.actions;
export default eventSlice.reducer;
