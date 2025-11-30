import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CareerSummaryState {
  jobTitle: string;
  jobDescription: string;
}

const initialCareerSummaryState: CareerSummaryState = {
  jobTitle: "",
  jobDescription: "",
};

const careerSummarySlice = createSlice({
  name: "careerSummary",
  initialState: initialCareerSummaryState,
  reducers: {
    updateCareerInfo: (
      state,
      action: PayloadAction<Partial<CareerSummaryState>>
    ) => {
      return {
        ...state,
        ...action.payload,
      };
    },

    resetCareerInfo: () => {
      return initialCareerSummaryState;
    },
  },
});

export const { updateCareerInfo, resetCareerInfo } = careerSummarySlice.actions;
export default careerSummarySlice.reducer;
