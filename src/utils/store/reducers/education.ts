import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

export interface EducationEntry {
  id: string;
  degree: string;
  institutionName: string;
  major: string;
  graduationStart: string;
  graduationEnd: string;
}

export interface EducationState {
  entries: EducationEntry[];
}

const initialEducationState: EducationState = {
  entries: [],
};

const educationSlice = createSlice({
  name: "education",
  initialState: initialEducationState,
  reducers: {
    addEducationInfo: (state) => {
      const newId = nanoid(10).toLowerCase();
      state.entries.push({
        id: newId,
        degree: "",
        institutionName: "",
        major: "",
        graduationStart: "",
        graduationEnd: "",
      });
    },

    updateEducationInfo: (
      state,
      action: PayloadAction<{
        id: string;
        changes: Partial<Omit<EducationEntry, "id">>;
      }>
    ) => {
      const { id, changes } = action.payload;
      const index = state.entries.findIndex((entry) => entry.id === id);

      if (index !== -1) {
        state.entries[index] = {
          ...state.entries[index],
          ...changes,
        };
      }
    },

    resetEducationInfo: (state) => {
      state.entries = initialEducationState.entries;
    },
  },
});

export const { addEducationInfo, updateEducationInfo, resetEducationInfo } =
  educationSlice.actions;
export default educationSlice.reducer;
