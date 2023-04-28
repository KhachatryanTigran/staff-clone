import { createSlice } from "@reduxjs/toolkit/dist";

const initialState = {
  jobsData: [],
  filtredJobsData: [],
  companyData: [],
};

const jobsSlice = createSlice({
  name: "jobsSlice",

  initialState,
  reducers: {
    addJobsData(state, action) {
      state.jobsData = action.payload;
    },
    addfilteredJobsData(state, action) {
      state.filtredJobsData = action.payload;
    },
    addCompaniesData(state, action) {
      state.companyData = action.payload;
    },
  },
});

export const { addJobsData, addCompaniesData, addfilteredJobsData } =
  jobsSlice.actions;

export default jobsSlice.reducer;
