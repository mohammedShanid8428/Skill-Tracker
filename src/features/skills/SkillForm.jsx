import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateSkill, addSkill, fetchSkillById, clearCurrentSkill } from "./SkillSlice"
import { Pencil, Link as LinkIcon, ClipboardList, Calendar, BookOpen, FileText, Image } from "lucide-react";
import toast from 'react-hot-toast';

const SkillForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentSkill, status } = useSelector((state) => state.skills);
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    courses: [],
    imageUrl: "",
    progress: 0,
    goal: "",
    notes: "",
    relatedProjects: []
  });

  const [newCourse, setNewCourse] = useState("");
  const [newProject, setNewProject] = useState("");

  useEffect(() => {
    if (isEditMode) {
      dispatch(fetchSkillById(id));
    }

    return () => {
      dispatch(clearCurrentSkill());
    };
  }, [dispatch, id, isEditMode]);

  useEffect(() => {
    if (isEditMode && currentSkill) {
      setFormData(currentSkill);
    }
  }, [currentSkill, isEditMode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditMode) {
      dispatch(updateSkill({ id, ...formData }))
        .unwrap()
        .then(() => {
          toast.success('Skill updated successfully');
          navigate(`/skills/${id}`);
        })
        .catch(() => {
          toast.error('Failed to update skill');
        });
    } else {
      dispatch(addSkill(formData))
        .unwrap()
        .then((newSkill) => {
          toast.success('Skill added successfully');
          navigate(`/skills/${newSkill.id}`);
        })
        .catch(() => {
          toast.error('Failed to add skill');
        });
    }
  };

  const addCourse = () => {
    if (newCourse.trim()) {
      setFormData({
        ...formData,
        courses: [...formData.courses, newCourse]
      });
      setNewCourse("");
    }
  };

  const removeCourse = (index) => {
    const updatedCourses = [...formData.courses];
    updatedCourses.splice(index, 1);
    setFormData({ ...formData, courses: updatedCourses });
  };

  const addProject = () => {
    if (newProject.trim()) {
      setFormData({
        ...formData,
        relatedProjects: [...formData.relatedProjects, newProject]
      });
      setNewProject("");
    }
  };

  const removeProject = (index) => {
    const updatedProjects = [...formData.relatedProjects];
    updatedProjects.splice(index, 1);
    setFormData({ ...formData, relatedProjects: updatedProjects });
  };

  if (isEditMode && status === 'loading') {
    return <div className="text-center mt-20">Loading skill data...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200 my-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <BookOpen className="h-6 w-6 text-blue-500 mr-2" />
        {isEditMode ? "Edit Skill" : "Add New Skill"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Skill Name */}
        <div>
          <label className="block mb-1 text-sm font-medium">Skill Name *</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 text-sm font-medium">Category *</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a category</option>
            <option value="Technical">Technical</option>
            <option value="Design">Design</option>
            <option value="Business">Business</option>
            <option value="Marketing">Marketing</option>
            <option value="Soft Skills">Soft Skills</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 text-sm font-medium flex items-center">
            <FileText className="w-4 h-4 mr-1" /> Description *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows="3"
            required
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>

        {/* Courses */}
        <div>
          <label className="block mb-1 text-sm font-medium flex items-center">
            <LinkIcon className="w-4 h-4 mr-1" /> Courses
          </label>
          <div className="flex mb-2">
            <input
              type="text"
              value={newCourse}
              onChange={(e) => setNewCourse(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Add a course name or URL"
            />
            <button
              type="button"
              onClick={addCourse}
              className="bg-blue-500 text-white px-4 rounded-r-md hover:bg-blue-600"
            >
              Add
            </button>
          </div>
          {formData.courses.length > 0 && (
            <ul className="space-y-1 mb-2">
              {formData.courses.map((course, index) => (
                <li key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded border border-gray-200">
                  <span className="text-sm text-gray-700 truncate">{course}</span>
                  <button
                    type="button"
                    onClick={() => removeCourse(index)}
                    className="text-red-500 hover:text-red-700 text-lg font-bold"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Image URL */}
        <div>
          <label className="block mb-1 text-sm font-medium flex items-center">
            <Image className="w-4 h-4 mr-1" /> Image URL
          </label>
          <input
            type="url"
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder=""
          />
          {formData.imageUrl && (
            <div className="mt-2">
              <img 
                src={formData.imageUrl} 
                alt="Preview" 
                className="h-32 object-cover rounded-md border border-gray-200"
                onError={(e) => {
                  e.target.src = "";
                }}
              />
            </div>
          )}
        </div>

        {/* Progress */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Progress ({formData.progress}%)
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={formData.progress}
            onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) })}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Projects */}
        <div>
          <label className="block mb-1 text-sm font-medium flex items-center">
            <ClipboardList className="w-4 h-4 mr-1" /> Related Projects
          </label>
          <div className="flex mb-2">
            <input
              type="text"
              value={newProject}
              onChange={(e) => setNewProject(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Project name"
            />
            <button
              type="button"
              onClick={addProject}
              className="bg-blue-500 text-white px-4 rounded-r-md hover:bg-blue-600"
            >
              Add
            </button>
          </div>
          {formData.relatedProjects.length > 0 && (
            <ul className="space-y-1 mb-2">
              {formData.relatedProjects.map((project, index) => (
                <li key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded border border-gray-200">
                  <span className="text-sm text-gray-700">{project}</span>
                  <button
                    type="button"
                    onClick={() => removeProject(index)}
                    className="text-red-500 hover:text-red-700 text-lg font-bold"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium mb-1">Notes</label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            rows="2"
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>

        {/* Goal Date */}
        <div>
          <label className="block mb-1 text-sm font-medium flex items-center">
            <Calendar className="w-4 h-4 mr-1" /> Goal Date
          </label>
          <input
            type="date"
            value={formData.goal}
            onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={() => navigate(isEditMode ? `/skills/${id}` : '/skills')}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {isEditMode ? "Update Skill" : "Save Skill"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SkillForm;