// src/components/SkillCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, BarChart2, ChevronRight, ImageOff } from 'lucide-react';

const SkillCard = ({ skill }) => {
  const skillId = skill.id || skill._id;
  const [imgError, setImgError] = React.useState(false);

  return (
    <Link to={`/skills/${skillId}`} className="block group transition-transform hover:scale-[1.015]">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col border border-gray-200 hover:shadow-xl transition-shadow duration-200">
        {/* Image */}
        <div className="relative w-full h-44 bg-gray-100 flex items-center justify-center overflow-hidden">
          {!imgError && skill.imageUrl ? (
            <img
              src={skill.imageUrl}
              alt={skill.name}
              className="object-cover w-full h-full"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="text-gray-400 flex flex-col items-center">
              <ImageOff className="h-10 w-10" />
              <span className="text-sm mt-1">No image</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col justify-between flex-grow">
          <div className="flex-1">
            {/* Title */}
            <div className="flex items-center mb-3">
              <BookOpen className="h-5 w-5 text-blue-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-800">{skill.name}</h3>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{skill.description}</p>

            {/* Courses */}
            {skill.courses?.length > 0 && (
              <div className="mb-4">
                <h4 className="text-xs text-gray-500 uppercase font-medium mb-1">Courses</h4>
                <ul className="space-y-1">
                  {skill.courses.slice(0, 3).map((course, index) => (
                    <li key={index} className="text-sm text-gray-700 flex items-center">
                      <span className="h-1.5 w-1.5 bg-blue-400 rounded-full mr-2"></span>
                      <span className="truncate">{course}</span>
                    </li>
                  ))}
                  {skill.courses.length > 3 && (
                    <li className="text-xs text-gray-500">+{skill.courses.length - 3} more</li>
                  )}
                </ul>
              </div>
            )}

            {/* Progress */}
            <div className="mb-2">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Progress</span>
                <span>{skill.progress || 0}%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all"
                  style={{ width: `${skill.progress || 0}%` }}
                />
              </div>
            </div>

            {/* Goal Date */}
            <div className="text-xs text-gray-400 mt-2">
              Goal:{" "}
              {skill.goal ? new Date(skill.goal).toLocaleDateString("en-IN") : "N/A"}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center mt-4 pt-2 border-t border-gray-100">
            <div className="flex items-center text-xs text-gray-500">
              <BarChart2 className="h-4 w-4 text-blue-500 mr-1" />
              {skill.category || "Other"}
            </div>
            <span className="flex items-center text-sm text-blue-600 group-hover:text-blue-800 transition-colors">
              View <ChevronRight className="h-4 w-4 ml-1" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SkillCard;
