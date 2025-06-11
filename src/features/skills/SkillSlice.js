import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  skills: [],
  skillCards: [
    {
      id: 1,
      name: "Web Development",
      category: "Technical",
      description: "Build modern web applications",
      courses: ["HTML/CSS", "JavaScript", "React", "Node.js"]
    },
    {
      id: 2,
      name: "Data Science",
      category: "Technical",
      description: "Analyze and interpret complex data",
      courses: ["Python", "Pandas", "Machine Learning", "Statistics"]
    },
    {
      id: 3,
      name: "Mobile Development",
      category: "Technical",
      description: "Create mobile applications",
      courses: ["React Native", "Flutter", "Swift", "Kotlin"]
    },
    {
      id: 4,
      name: "UI/UX Design",
      category: "Design",
      description: "Design user interfaces and experiences",
      courses: ["Figma", "Adobe XD", "User Research", "Prototyping"]
    },
    {
      id: 5,
      name: "Project Management",
      category: "Business",
      description: "Lead projects to success",
      courses: ["Agile", "Scrum", "Risk Management", "Leadership"]
    },
    {
      id: 6,
      name: "Digital Marketing",
      category: "Marketing",
      description: "Promote products online",
      courses: ["SEO", "Social Media", "Content Marketing", "Analytics"]
    },
    {
      id: 7,
      name: "Cloud Computing",
      category: "Technical",
      description: "Work with cloud platforms",
      courses: ["AWS", "Azure", "Google Cloud", "DevOps"]
    },
    {
      id: 8,
      name: "Cybersecurity",
      category: "Technical",
      description: "Protect systems and data",
      courses: ["Ethical Hacking", "Network Security", "Cryptography", "Compliance"]
    },
    {
      id: 9,
      name: "Artificial Intelligence",
      category: "Technical",
      description: "Develop intelligent systems",
      courses: ["Machine Learning", "Neural Networks", "NLP", "Computer Vision"]
    },
    {
      id: 10,
      name: "Blockchain",
      category: "Technical",
      description: "Work with decentralized systems",
      courses: ["Smart Contracts", "Solidity", "Ethereum", "Cryptography"]
    },
    {
      id: 11,
      name: "Public Speaking",
      category: "Soft Skills",
      description: "Communicate effectively",
      courses: ["Presentation Skills", "Storytelling", "Voice Modulation", "Body Language"]
    },
    {
      id: 12,
      name: "Creative Writing",
      category: "Soft Skills",
      description: "Express ideas through writing",
      courses: ["Story Structure", "Character Development", "Editing", "Publishing"]
    }
  ]
};

const skillSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {
    addSkill: (state, action) => {
      state.skills.push({ 
        id: Date.now(), 
        ...action.payload,
        progress: 0,
        resources: [],
        projects: [],
        lastPracticed: new Date().toISOString()
      });
    },
    updateSkill: (state, action) => {
      const index = state.skills.findIndex(skill => skill.id === action.payload.id);
      if (index !== -1) state.skills[index] = action.payload;
    },
    deleteSkill: (state, action) => {
      state.skills = state.skills.filter(skill => skill.id !== action.payload);
    },
    addResourceToSkill: (state, action) => {
      const { skillId, resource } = action.payload;
      const skill = state.skills.find(s => s.id === skillId);
      if (skill) {
        skill.resources.push(resource);
      }
    },
    addProjectToSkill: (state, action) => {
      const { skillId, project } = action.payload;
      const skill = state.skills.find(s => s.id === skillId);
      if (skill) {
        skill.projects.push(project);
      }
    },
    updateProgress: (state, action) => {
      const { skillId, progress } = action.payload;
      const skill = state.skills.find(s => s.id === skillId);
      if (skill) {
        skill.progress = progress;
      }
    }
  },
});

export const { 
  addSkill, 
  updateSkill, 
  deleteSkill,
  addResourceToSkill,
  addProjectToSkill,
  updateProgress
} = skillSlice.actions;

export default skillSlice.reducer;