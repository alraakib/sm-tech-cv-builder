import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ContactInfoState {
  linkedIn: string;
  portfolio: string;
  other: string;
}

const initialContactInfoState: ContactInfoState = {
  linkedIn: "",
  portfolio: "",
  other: "",
};

const contactInfoSlice = createSlice({
  name: "contactInfo",
  initialState: initialContactInfoState,
  reducers: {
    updateContactInfo: (
      state,
      action: PayloadAction<Partial<ContactInfoState>>
    ) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    resetContactInfo: () => {
      return initialContactInfoState;
    },
  },
});

export const { updateContactInfo, resetContactInfo } = contactInfoSlice.actions;
export default contactInfoSlice.reducer;
