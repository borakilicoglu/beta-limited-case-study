import { configureStore } from "@reduxjs/toolkit";
import { caseStudyApi } from "./services/caseStudyApi"; // adjust the import path as needed
import caseStudyReducer from "./features/caseStudySlice"; // adjust the import path as needed

export const store = configureStore({
  reducer: {
    caseStudyUi: caseStudyReducer,
    [caseStudyApi.reducerPath]: caseStudyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(caseStudyApi.middleware),
});
