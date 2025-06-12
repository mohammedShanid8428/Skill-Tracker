// src/components/SkillGrid.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SkillCard from './SkillCard';
import { fetchSkills } from "./SkillSlice"

const SkillGrid = () => {
  const dispatch = useDispatch();
  const { skills, status, error } = useSelector(state => state.skills);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchSkills());
    }
  }, [dispatch, status]);

  return (
    <div className="py-8 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Explore Skills</h2>

      {status === 'loading' && <p className="text-center text-gray-500">Loading...</p>}
      {status === 'failed' && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {skills.map((skill, index) => (
          <SkillCard key={skill.id || skill._id || index} skill={skill} />
        ))}
      </div>
    </div>
  );
};

export default SkillGrid;
