import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import companyInfoSlice from "./slices/companyInfoSlice";
import filterSlice from "./slices/filterSlice";
import jobsSlice from "./slices/jobsSlice";
import loginSlice from "./slices/loginSlice";
import userSlice from "./slices/userSlice";
import { dataApi } from "./slices/dataControlRTKQ";

import newJobSlice from "./slices/newJobSlice";

const store = configureStore({
  reducer: {
    jobsSlice,
    filterSlice,
    loginSlice,
    userSlice,
    companyInfoSlice,
    [dataApi.reducerPath]: dataApi.reducer,

    newJobSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      dataApi.middleware
    ),
});
setupListeners(store.dispatch);
export default store;
