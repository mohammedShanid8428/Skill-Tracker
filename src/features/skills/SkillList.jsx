import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSkills } from "./SkillSlice"
import SkillCard from "./SkillCard";
import { Link } from "react-router-dom";
import { PlusCircle } from "lucide-react";

const SkillList = () => {
  const dispatch = useDispatch();
  const { skills, status, error } = useSelector((state) => state.skills);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    dispatch(fetchSkills());
  }, [dispatch]);

  const categories = ["All", ...new Set(skills.map((s) => s.category))];

  const filteredSkills =
    selectedCategory === "All"
      ? skills
      : skills.filter((s) => s.category === selectedCategory);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">My Skills</h1>

        <div className="flex gap-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm"
          >
            {categories.map((category, idx) => (
              <option value={category} key={idx}>
                {category}
              </option>
            ))}
          </select>

          <Link
            to="/skills/new"
            className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <PlusCircle className="w-5 h-5" />
            Add Skill
          </Link>
        </div>
      </div>

      {status === 'loading' && (
        <div className="flex justify-center items-center h-64">
          <Player
            autoplay
            loop
            src="https://assets3.lottiefiles.com/packages/lf20_usmfx6bp.json"
            style={{ height: '200px', width: '200px' }}
          />
        </div>
      )}

      {status === 'failed' && (
        <p className="text-center text-red-500">{error}</p>
      )}

      {status === "succeeded" && filteredSkills.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          No skills found. Add a new skill to get started.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillList;