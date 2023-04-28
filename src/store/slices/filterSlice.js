import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  levelCategory: [],
  jobCategory: [],
  activTypeCategoryCompany: [],
  industryCategoryCompany: [],
  jobCities: [],
  searchJobs: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,

  reducers: {
    changeSearchJob(state, action) {
      state.searchJobs = action.payload;
    },

    setFilter(state, action) {
      const category = action.payload.category;
      state[category].push(action.payload.value);
    },

    deleteFilter(state, action) {
      const category = action.payload.category;
      state[category] = state[category].filter(
        (item) => item !== action.payload.value
      );
    },
    emptyFilter(state, action) {
      const category = action.payload.category;

      state[category] = [];
    },
  },
});

export const { deleteFilter, setFilter, changeSearchJob, emptyFilter } =
  filterSlice.actions;
export default filterSlice.reducer;
