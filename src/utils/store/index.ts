import careerSummaryReducer from "@/utils/store/reducers/career-summary";
import certificateReducer from "@/utils/store/reducers/certificate";
import contactInfoReducer from "@/utils/store/reducers/contact-information";
import educationReducer from "@/utils/store/reducers/education";
import experienceReducer from "@/utils/store/reducers/experience-skill";
import personalInfoReducer from "@/utils/store/reducers/personal-info";
import resumeReducer from "@/utils/store/reducers/resume";
import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, (state: any, action) => {
  if (!state) {
    return {
      personalInfo: personalInfoReducer(undefined, action),
      careerSummary: careerSummaryReducer(undefined, action),
      experience: experienceReducer(undefined, action),
      education: educationReducer(undefined, action),
      certificate: certificateReducer(undefined, action),
      contactInfo: contactInfoReducer(undefined, action),
      resume: resumeReducer(undefined, action),
    };
  }
  return {
    personalInfo: personalInfoReducer(state.personalInfo, action),
    careerSummary: careerSummaryReducer(state.careerSummary, action),
    experience: experienceReducer(state.experience, action),
    education: educationReducer(state.education, action),
    certificate: certificateReducer(state.certificate, action),
    contactInfo: contactInfoReducer(state.contactInfo, action),
    resume: resumeReducer(state.resume, action),
  };
});

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
