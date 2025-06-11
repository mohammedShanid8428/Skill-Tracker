import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteSkill } from "./SkillSlice";
import SkillForm from "./SkillForm";

const SkillList = () => {
  const skills = useSelector((state) => state.skills);
  const dispatch = useDispatch();
  const [editData, setEditData] = useState(null);

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Skills</h2>
      <SkillForm editData={editData} setEditData={setEditData} />

      <ul className="space-y-3">
        {skills.map((skill) => (
          <li key={skill.id} className="bg-white shadow p-4 rounded flex justify-between items-center">
            <div>
              <p className="font-semibold">{skill.name}</p>
              <p className="text-sm text-gray-500">{skill.level}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => setEditData(skill)}
                className="px-3 py-1 text-sm bg-yellow-400 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => dispatch(deleteSkill(skill.id))}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillList;
