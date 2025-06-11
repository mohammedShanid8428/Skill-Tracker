import { configureStore } from "@reduxjs/toolkit";
import skillReducer from "../src/features/skills/SkillSlice"
import projectReducer from "../src/features/skills/projects/ProjectSlice"
import CertificationForm from "./features/skills/certification/CertificationForm";
import CertificationReducer from "./features/skills/certification/CertificationSlice"

export const store=configureStore({
  reducer:{
    skills:skillReducer,
    projects:projectReducer,
    Certifications:CertificationReducer
  }
})