import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, BarChart2, PlusCircle } from 'lucide-react';

const SkillCard = ({ skill }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <BookOpen className="h-6 w-6 text-blue-500 mr-3" />
          <h3 className="text-xl font-semibold text-gray-800">{skill.name}</h3>
        </div>
        <p className="text-gray-600 mb-4">{skill.description}</p>
        
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Recommended Courses:</h4>
          <ul className="space-y-1">
            {skill.courses.slice(0, 3).map((course, index) => (
              <li key={index} className="text-sm text-gray-700 flex items-center">
                <span className="h-1 w-1 bg-gray-400 rounded-full mr-2"></span>
                {course}
              </li>
            ))}
            {skill.courses.length > 3 && (
              <li className="text-sm text-gray-500">+{skill.courses.length - 3} more</li>
            )}
          </ul>
        </div>
        
        <div className="flex justify-between items-center mt-6">
          <div className="flex items-center">
            <BarChart2 className="h-4 w-4 text-blue-500 mr-1" />
            <span className="text-xs text-gray-500">{skill.category}</span>
          </div>
          <Link 
            to={`/skills/${skill.id}`} 
            className="flex items-center text-sm text-blue-600 hover:text-blue-800"
          >
            <PlusCircle className="h-4 w-4 mr-1" />
            Add to My Skills
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;