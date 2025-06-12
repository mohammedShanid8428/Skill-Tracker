import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateSkill, addSkill, fetchSkillById, clearCurrentSkill } from "./SkillSlice";
import {
  Pencil, Link as LinkIcon, ClipboardList, Calendar,
  BookOpen, FileText, Image
} from "lucide-react";
import toast from "react-hot-toast";

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
    relatedProjects: [],
  });

  const [newCourse, setNewCourse] = useState("");
  const [newProject, setNewProject] = useState("");
  const [imageError, setImageError] = useState(false);

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

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const action = isEditMode ? updateSkill({ id, ...formData }) : addSkill(formData);

    dispatch(action)
      .unwrap()
      .then((res) => {
        toast.success(isEditMode ? "Skill updated successfully" : "Skill added successfully");
        navigate(`/skills/${res.id || id}`);
      })
      .catch(() => {
        toast.error("Something went wrong. Please try again.");
      });
  };

  const handleAddToArray = (type, value) => {
    if (value.trim()) {
      setFormData((prev) => ({
        ...prev,
        [type]: [...prev[type], value],
      }));
      type === "courses" ? setNewCourse("") : setNewProject("");
    }
  };

  const handleRemoveFromArray = (type, index) => {
    const updated = [...formData[type]];
    updated.splice(index, 1);
    setFormData({ ...formData, [type]: updated });
  };

  if (isEditMode && status === "loading") {
    return <div className="text-center mt-20">Loading skill data...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-lg border border-blue-100 my-12">
      <h2 className="text-3xl font-semibold mb-8 flex items-center text-blue-700">
        <BookOpen className="h-7 w-7 text-blue-500 mr-2" />
        {isEditMode ? "Edit Skill" : "Add New Skill"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          label="Skill Name"
          required
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
        />

        <div>
          <label className="block text-sm font-medium mb-1">Category *</label>
          <select
            value={formData.category}
            onChange={(e) => handleInputChange("category", e.target.value)}
            required
            className="w-full border p-3 rounded-md focus:ring-2 focus:ring-blue-200"
          >
            <option value="">Select a category</option>
            {["Technical", "Design", "Business", "Marketing", "Soft Skills", "Other"].map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <TextAreaField
          label="Description"
          icon={<FileText className="w-4 h-4 mr-1" />}
          required
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
        />

        <DynamicListInput
          label="Courses"
          icon={<LinkIcon className="w-4 h-4 mr-1" />}
          newValue={newCourse}
          setNewValue={setNewCourse}
          items={formData.courses}
          onAdd={() => handleAddToArray("courses", newCourse)}
          onRemove={(i) => handleRemoveFromArray("courses", i)}
          placeholder="Course name or link"
        />

        <InputField
          label="Image URL"
          icon={<Image className="w-4 h-4 mr-1" />}
          type="url"
          value={formData.imageUrl}
          onChange={(e) => {
            setImageError(false);
            handleInputChange("imageUrl", e.target.value);
          }}
        />
        {formData.imageUrl && !imageError && (
          <img
            src={formData.imageUrl}
            alt="Preview"
            onError={() => setImageError(true)}
            className="h-32 mt-2 object-cover rounded border"
          />
        )}

        <div>
          <label className="block text-sm font-medium mb-1">
            Progress ({formData.progress}%)
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={formData.progress}
            onChange={(e) => handleInputChange("progress", parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <DynamicListInput
          label="Related Projects"
          icon={<ClipboardList className="w-4 h-4 mr-1" />}
          newValue={newProject}
          setNewValue={setNewProject}
          items={formData.relatedProjects}
          onAdd={() => handleAddToArray("relatedProjects", newProject)}
          onRemove={(i) => handleRemoveFromArray("relatedProjects", i)}
          placeholder="Project name"
        />

        <TextAreaField
          label="Notes"
          rows={2}
          value={formData.notes}
          onChange={(e) => handleInputChange("notes", e.target.value)}
        />

        <InputField
          label="Goal Date"
          icon={<Calendar className="w-4 h-4 mr-1" />}
          type="date"
          value={formData.goal}
          onChange={(e) => handleInputChange("goal", e.target.value)}
        />

        <div className="flex justify-end gap-4 pt-6">
          <button
            type="button"
            onClick={() => navigate(isEditMode ? `/skills/${id}` : "/skills")}
            className="px-5 py-2 border rounded-lg text-sm hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
          >
            {isEditMode ? "Update Skill" : "Save Skill"}
          </button>
        </div>
      </form>
    </div>
  );
};

const InputField = ({ label, icon, ...props }) => (
  <div>
    <label className="block text-sm font-medium mb-1 flex items-center">
      {icon} {label}
    </label>
    <input
      {...props}
      className="w-full border p-3 rounded-md focus:ring-2 focus:ring-blue-200"
    />
  </div>
);

const TextAreaField = ({ label, icon, ...props }) => (
  <div>
    <label className="block text-sm font-medium mb-1 flex items-center">
      {icon} {label}
    </label>
    <textarea
      {...props}
      className="w-full border p-3 rounded-md focus:ring-2 focus:ring-blue-200"
    ></textarea>
  </div>
);

const DynamicListInput = ({ label, icon, newValue, setNewValue, items, onAdd, onRemove, placeholder }) => (
  <div>
    <label className="block text-sm font-medium mb-1 flex items-center">
      {icon} {label}
    </label>
    <div className="flex mb-3">
      <input
        type="text"
        value={newValue}
        onChange={(e) => setNewValue(e.target.value)}
        className="flex-1 p-3 border rounded-l-md focus:ring-2 focus:ring-blue-200"
        placeholder={placeholder}
      />
      <button
        type="button"
        onClick={onAdd}
        className="bg-blue-500 text-white px-4 rounded-r-md hover:bg-blue-600"
      >
        Add
      </button>
    </div>
    {items.length > 0 && (
      <ul className="space-y-1">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-center justify-between p-2 border rounded bg-gray-50"
          >
            <span className="text-sm truncate">{item}</span>
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="text-red-500 text-lg font-bold"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default SkillForm;