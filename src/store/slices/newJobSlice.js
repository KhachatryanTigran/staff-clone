import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  description: null,
  responsibilities: null,
  qualifications: null,
  additionalInformation: null,
  category: null,
  date: null,
  industry: null,
  jobName: null,
  level: null,
  location: null,
  JobType: null,

  allData: [],
};

const newJobSlice = createSlice({
  name: "newJob",
  initialState,
  reducers: {
    changeJobSlice(state, action) {
      state.category = action.payload.category;
      state.date = action.payload.date;
      state.industry = action.payload.industry;
      state.jobName = action.payload.jobName;
      state.level = action.payload.level;
      state.location = action.payload.location;
      state.JobType = action.payload.JobType;
      state.description = action.payload.description;
      state.responsibilities = action.payload.responsibilities;
      state.qualifications = action.payload.qualifications;
      state.additionalInformation = action.payload.additionalInformation;
    },
  },
});

export const activeDataSelector = (state) => state.newJobSlice;

export const { changeJobSlice } = newJobSlice.actions;
export default newJobSlice.reducer;
