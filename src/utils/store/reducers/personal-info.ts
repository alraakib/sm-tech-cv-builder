import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PersonalInfoState {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  emailAddress: string;
  countryRegion: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

const initialPersonalInfoState: PersonalInfoState = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  emailAddress: "",
  countryRegion: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
};

const personalInfoSlice = createSlice({
  name: "personalInfo",
  initialState: initialPersonalInfoState,
  reducers: {
    updatePersonalInfo: (
      state,
      action: PayloadAction<Partial<PersonalInfoState>>
    ) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    resetPersonalInfo: () => {
      return initialPersonalInfoState;
    },
  },
});

export const { updatePersonalInfo, resetPersonalInfo } =
  personalInfoSlice.actions;
export default personalInfoSlice.reducer;
