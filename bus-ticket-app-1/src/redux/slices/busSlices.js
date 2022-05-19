import { createSlice } from "@reduxjs/toolkit";

export const busListSlice = createSlice({
  name: "busList",

  initialState: {
    bus: {},
  },
  reducers: {
    busList: (state, action) => {
      state = action.payload;
    },
  },
});

export const { busList } = busListSlice.actions;

export const selectbus = (state) => state.bus.bus;

export default busListSlice.reducer;
