import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: [],
  text: [],
};

const companyInfoSlice = createSlice({
  name: "companyInfo",
  initialState,

  reducers: {
    onEditText(state, action) {
      state.text = action.payload;
    },
    onEditTitle(state, action) {
      state.title = action.payload;
    },
  },
});

export const { onEditTitle, onEditText } = companyInfoSlice.actions;
export default companyInfoSlice.reducer;
