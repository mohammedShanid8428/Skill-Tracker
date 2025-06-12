// src/features/skills/SkillSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";

const API_URL = "https://skill-tracker-server.onrender.com";

// Thunks
export const fetchSkills = createAsyncThunk("skills/fetchSkills", async () => {
  try {
    const response = await axios.get(API_URL); // Correct URL
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
});

export const fetchSkillById = createAsyncThunk("skills/fetchSkillById", async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
});

export const addSkill = createAsyncThunk("skills/addSkill", async (skillData) => {
  try {
    const response = await axios.post(API_URL, skillData);
    toast.success("Skill added successfully");
    return response.data;
  } catch (error) {
    toast.error("Failed to add skill");
    throw error.response?.data || error.message;
  }
});

export const updateSkill = createAsyncThunk("skills/updateSkill", async ({ id, ...skillData }) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, skillData);
    toast.success("Skill updated successfully");
    return response.data;
  } catch (error) {
    toast.error("Failed to update skill");
    throw error.response?.data || error.message;
  }
});

export const deleteSkill = createAsyncThunk("skills/deleteSkill", async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    toast.success("Skill deleted successfully");
    return id;
  } catch (error) {
    toast.error("Failed to delete skill");
    throw error.response?.data || error.message;
  }
});

// Slice
const initialState = {
  skills: [],
  currentSkill: null,
  status: "idle",
  error: null,
};

const skillSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {
    clearCurrentSkill: (state) => {
      state.currentSkill = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkills.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.skills = action.payload;
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchSkillById.fulfilled, (state, action) => {
        state.currentSkill = action.payload;
      })
      .addCase(addSkill.fulfilled, (state, action) => {
        state.skills.push(action.payload);
      })
      .addCase(updateSkill.fulfilled, (state, action) => {
        const index = state.skills.findIndex(skill => skill.id === action.payload.id);
        if (index !== -1) {
          state.skills[index] = action.payload;
        }
      })
      .addCase(deleteSkill.fulfilled, (state, action) => {
        state.skills = state.skills.filter(skill => skill.id !== action.payload);
      });
  },
});

export const { clearCurrentSkill } = skillSlice.actions;
export default skillSlice.reducer;
