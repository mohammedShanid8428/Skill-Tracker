import { configureStore } from "@reduxjs/toolkit";
import skillReducer from "../src/features/skills/SkillSlice"

export const store=configureStore({
  reducer:{
    skills:skillReducer
  }
})