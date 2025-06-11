import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addSkill, updateSkill } from "./SkillSlice";

const SkillForm = ({ editData, setEditData }) => {
  const [name, setName] = useState("");
  const [level, setLevel] = useState("Beginner");
  const dispatch = useDispatch();

  useEffect(() => {
    if (editData) {
      setName(editData.name);
      setLevel(editData.level);
    }
  }, [editData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const skill = { name, level };

    if (editData) {
      dispatch(updateSkill({ ...editData, ...skill }));
      setEditData(null);
    } else {
      dispatch(addSkill(skill));
    }

    setName("");
    setLevel("Beginner");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Skill name"
        required
        className="border p-2 w-full rounded"
      />
      <select
        value={level}
        onChange={(e) => setLevel(e.target.value)}
        className="border p-2 w-full rounded"
      >
        <option>Beginner</option>
        <option>Intermediate</option>
        <option>Expert</option>
      </select>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {editData ? "Update Skill" : "Add Skill"}
      </button>
    </form>
  );
};

export default SkillForm;
