import React from 'react';
import { useSelector } from 'react-redux';
import SkillCard from './SkillCard';

const SkillGrid = () => {
  const skillCards = useSelector(state => state.skills.skillCards);

  return (
    <div className="py-8 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Explore Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {skillCards.map(skill => (
          <SkillCard key={skill.id} skill={skill} />
        ))}
      </div>
    </div>
  );
};

export default SkillGrid;