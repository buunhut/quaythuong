import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listWinner: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    updateListWinner(state, action) {
      state.listWinner = action.payload;
    },
  },
});

export const { updateListWinner } = dataSlice.actions;
export default dataSlice.reducer;
