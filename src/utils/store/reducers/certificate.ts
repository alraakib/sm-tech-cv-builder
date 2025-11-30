import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

export interface CertificateEntry {
  id: string;
  title: string;
  issuingOrganization: string;
  issueDate: string;
  expiryDate: string;
}

export interface CertificateState {
  entries: CertificateEntry[];
}

const initialCertificateState: CertificateState = {
  entries: [],
};

const certificateSlice = createSlice({
  name: "certificate",
  initialState: initialCertificateState,
  reducers: {
    addCertificateInfo: (state) => {
      const newId = nanoid(10).toLowerCase();
      state.entries.push({
        id: newId,
        title: "",
        issuingOrganization: "",
        issueDate: "",
        expiryDate: "",
      });
    },

    updateCertificateInfo: (
      state,
      action: PayloadAction<{
        id: string;
        changes: Partial<Omit<CertificateEntry, "id">>;
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

    resetCertificateInfo: (state) => {
      state.entries = initialCertificateState.entries;
    },
  },
});

export const { addCertificateInfo, updateCertificateInfo, resetCertificateInfo } =
  certificateSlice.actions;
export default certificateSlice.reducer;
