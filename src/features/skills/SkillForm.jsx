import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import { addSkill, updateSkill } from "./SkillSlice";
import { BookOpen, BarChart2, Link as LinkIcon, ClipboardList, Calendar } from 'lucide-react';

const SkillForm = ({ editData, setEditData }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const skillCards = useSelector(state => state.skills.skillCards);
  const skills = useSelector(state => state.skills.skills);
  
  const [formData, setFormData] = useState({
    name: "",
    level: "Beginner",
    progress: 0,
    resources: [],
    projects: [],
    notes: "",
    goalDate: ""
  });
  
  const [newResource, setNewResource] = useState("");
  const [newProject, setNewProject] = useState("");

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    } else if (id) {
      const cardData = skillCards.find(card => card.id === parseInt(id));
      if (cardData) {
        setFormData({
          ...formData,
          name: cardData.name,
          category: cardData.category
        });
      }
    }
  }, [editData, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const skillData = {
      ...formData,
      lastUpdated: new Date().toISOString()
    };

    if (editData) {
      dispatch(updateSkill(skillData));
      setEditData(null);
    } else {
      dispatch(addSkill(skillData));
    }

    navigate('/skills/list');
  };

  const addResource = () => {
    if (newResource.trim()) {
      setFormData({
        ...formData,
        resources: [...formData.resources, newResource]
      });
      setNewResource("");
    }
  };

  const addProject = () => {
    if (newProject.trim()) {
      setFormData({
        ...formData,
        projects: [...formData.projects, newProject]
      });
      setNewProject("");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <BookOpen className="h-6 w-6 text-blue-500 mr-2" />
        {editData ? "Update Skill" : "Add New Skill"}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Skill Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Skill Level</label>
          <select
            value={formData.level}
            onChange={(e) => setFormData({...formData, level: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Expert">Expert</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Progress ({formData.progress}%)
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={formData.progress}
            onChange={(e) => setFormData({...formData, progress: parseInt(e.target.value)})}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <LinkIcon className="h-4 w-4 mr-1" />
            Learning Resources
          </label>
          <div className="flex mb-2">
            <input
              type="text"
              value={newResource}
              onChange={(e) => setNewResource(e.target.value)}
              placeholder="Add resource URL"
              className="flex-1 p-2 border border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="button"
              onClick={addResource}
              className="bg-blue-500 text-white px-3 rounded-r-md hover:bg-blue-600"
            >
              Add
            </button>
          </div>
          <ul className="space-y-1">
            {formData.resources.map((resource, index) => (
              <li key={index} className="text-sm text-blue-600 hover:underline">
                <a href={resource} target="_blank" rel="noopener noreferrer">
                  {resource}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <ClipboardList className="h-4 w-4 mr-1" />
            Related Projects
          </label>
          <div className="flex mb-2">
            <input
              type="text"
              value={newProject}
              onChange={(e) => setNewProject(e.target.value)}
              placeholder="Project name"
              className="flex-1 p-2 border border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="button"
              onClick={addProject}
              className="bg-blue-500 text-white px-3 rounded-r-md hover:bg-blue-600"
            >
              Add
            </button>
          </div>
          <ul className="space-y-1">
            {formData.projects.map((project, index) => (
              <li key={index} className="text-sm text-gray-700">
                {project}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
            rows="3"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            Goal Completion Date
          </label>
          <input
            type="date"
            value={formData.goalDate}
            onChange={(e) => setFormData({...formData, goalDate: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/skills')}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {editData ? "Update Skill" : "Save Skill"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SkillForm;