import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cvData: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeCv(state, action) {
      state.cvData = action.payload;
    },
  },
});

export const { changeCv } = userSlice.actions;
export default userSlice.reducer;
