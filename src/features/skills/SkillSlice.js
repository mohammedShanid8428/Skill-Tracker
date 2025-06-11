import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const skillSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {
    addSkill: (state, action) => {
      state.push({ id: Date.now(), ...action.payload });
    },
    updateSkill: (state, action) => {
      const index = state.findIndex(skill => skill.id === action.payload.id);
      if (index !== -1) state[index] = action.payload;
    },
    deleteSkill: (state, action) => {
      return state.filter(skill => skill.id !== action.payload);
    }
  },
});

export const { addSkill, updateSkill, deleteSkill } = skillSlice.actions;
export default skillSlice.reducer;
