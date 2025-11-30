import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ResumeState {
  generatedResume: string;
  isGenerating: boolean;
}

const initialResumeState: ResumeState = {
  generatedResume: "",
  isGenerating: false,
};

const resumeSlice = createSlice({
  name: "resume",
  initialState: initialResumeState,
  reducers: {
    setGeneratedResume: (state, action: PayloadAction<string>) => {
      state.generatedResume = action.payload;
      state.isGenerating = false;
    },
    setGenerating: (state, action: PayloadAction<boolean>) => {
      state.isGenerating = action.payload;
    },
    resetResume: () => {
      return initialResumeState;
    },
  },
});

export const { setGeneratedResume, setGenerating, resetResume } =
  resumeSlice.actions;
export default resumeSlice.reducer;
