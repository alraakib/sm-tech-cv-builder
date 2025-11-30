import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

export interface ExperienceEntry {
  id: string;
  jobTitle: string;
  companyName: string;
  durationStart: string;
  durationEnd: string;
  description: string;
  skills: Array<string>;
}

export interface ExperienceState {
  entries: ExperienceEntry[];
}

const initialExperienceState: ExperienceState = {
  entries: [],
};

const experienceSlice = createSlice({
  name: "experience",
  initialState: initialExperienceState,
  reducers: {
    addEntry: (state) => {
      const newId = nanoid(10).toLowerCase();
      state.entries.push({
        id: newId,
        jobTitle: "",
        companyName: "",
        durationStart: "",
        durationEnd: "",
        description: "",
        skills: [],
      });
    },

    updateEntry: (
      state,
      action: PayloadAction<{
        id: string;
        changes: Partial<Omit<ExperienceEntry, "id">>;
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

    resetEntries: (state) => {
      state.entries = initialExperienceState.entries;
    },
  },
});

export const { addEntry, updateEntry, resetEntries } = experienceSlice.actions;
export default experienceSlice.reducer;
