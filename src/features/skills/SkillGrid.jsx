// src/components/SkillGrid.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import SkillCard from './SkillCard';
import { fetchSkills } from './SkillSlice'

const SkillGrid = () => {
  const dispatch = useDispatch();
  const { skills, status, error } = useSelector(state => state.skills);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchSkills());
    }
  }, [dispatch, status]);

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="flex justify-between items-center mb-8 ">
        <h2 className="text-3xl font-bold text-blue-800 text-center">Explore Skills</h2>
        <Link
          to="/skills/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          + Add New Skill
        </Link>
      </div>

      {status === 'loading' && <p className="text-center text-gray-500">Loading...</p>}
      {status === 'failed' && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill, index) => (
          <SkillCard key={skill.id || skill._id || index} skill={skill} />
        ))}
      </div>
    </div>
  );
};

export default SkillGrid;
