import { createSlice } from "@reduxjs/toolkit";

const certificationSlice = createSlice({
  name: "certifications",
  initialState: [],
  reducers: {
    addCertification: (state, action) => {
      state.push({ id: Date.now(), ...action.payload });
    },
    updateCertification: (state, action) => {
      const index = state.findIndex(cert => cert.id === action.payload.id);
      if (index !== -1) state[index] = action.payload;
    },
    deleteCertification: (state, action) => {
      return state.filter(cert => cert.id !== action.payload);
    }
  },
});

export const {
  addCertification,
  updateCertification,
  deleteCertification,
} = certificationSlice.actions;

export default certificationSlice.reducer;
