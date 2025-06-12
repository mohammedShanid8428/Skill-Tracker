// src/components/SkillCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, BarChart2, ChevronRight } from 'lucide-react';

const SkillCard = ({ skill }) => {
  const skillId = skill.id || skill._id; // ensure id compatibility

  return (
    <Link to={`/skills/${skillId}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col border border-gray-200">
        <img
          src={skill.imageUrl}
          alt={skill.name}
          onError={(e) => {
            e.target.src = "";
          }}
        />

        <div className="p-6 flex-grow flex flex-col justify-between">
          <div>
            <div className="flex items-center mb-4">
              <BookOpen className="h-6 w-6 text-blue-500 mr-3" />
              <h3 className="text-xl font-semibold text-gray-800">{skill.name}</h3>
            </div>

            <p className="text-gray-600 mb-4 line-clamp-2">{skill.description}</p>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-500 mb-2">Recommended Courses:</h4>
              <ul className="space-y-1">
                {skill.courses?.slice(0, 3).map((course, index) => (
                  <li key={index} className="text-sm text-gray-700 flex items-center">
                    <span className="h-1 w-1 bg-gray-400 rounded-full mr-2"></span>
                    <span className="truncate">{course}</span>
                  </li>
                ))}
                {skill.courses?.length > 3 && (
                  <li className="text-sm text-gray-500">+{skill.courses.length - 3} more</li>
                )}
              </ul>
            </div>

            <div className="mb-2">
              <div className="text-sm text-gray-600 mb-1">Progress: {skill.progress}%</div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-blue-500 rounded-full"
                  style={{ width: `${skill.progress}%` }}
                />
              </div>
            </div>

            <div className="text-sm text-gray-500 mt-2">
              Goal: {skill.goal ? new Date(skill.goal).toLocaleDateString() : 'N/A'}
            </div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center">
              <BarChart2 className="h-4 w-4 text-blue-500 mr-1" />
              <span className="text-xs text-gray-500">{skill.category}</span>
            </div>
            <span className="flex items-center text-sm text-blue-600 hover:text-blue-800">
              View Details <ChevronRight className="h-4 w-4 ml-1" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SkillCard;
