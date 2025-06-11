import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteSkill } from './SkillSlice';
import { Link } from 'react-router-dom';
import { BookOpen, BarChart2, Edit2, Trash2, ChevronRight } from 'lucide-react';

const SkillList = () => {
  const skills = useSelector(state => state.skills.skills);
  const dispatch = useDispatch();
  const [editData, setEditData] = useState(null);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold flex items-center">
          <BookOpen className="h-6 w-6 text-blue-500 mr-2" />
          My Skills
        </h2>
        <Link 
          to="/skills/new" 
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
        >
          Add New Skill <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>

      {skills.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">You haven't added any skills yet.</p>
          <Link 
            to="/skills" 
            className="text-blue-600 hover:underline flex items-center justify-center"
          >
            Browse skill cards to get started <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {skills.map(skill => (
            <div key={skill.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{skill.name}</h3>
                  <div className="flex items-center mt-1 mb-3">
                    <span className="text-sm font-medium text-gray-500 mr-3">{skill.level}</span>
                    <div className="flex items-center">
                      <BarChart2 className="h-4 w-4 text-blue-500 mr-1" />
                      <span className="text-sm text-gray-500">{skill.progress}% complete</span>
                    </div>
                  </div>
                  
                  {skill.notes && (
                    <p className="text-gray-600 mb-3">{skill.notes}</p>
                  )}
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {skill.resources.slice(0, 3).map((resource, index) => (
                      <a 
                        key={index} 
                        href={resource} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded hover:bg-blue-100"
                      >
                        Resource {index + 1}
                      </a>
                    ))}
                    {skill.resources.length > 3 && (
                      <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">
                        +{skill.resources.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditData(skill)}
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full"
                  >
                    <Edit2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => dispatch(deleteSkill(skill.id))}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Last updated: {new Date(skill.lastUpdated).toLocaleDateString()}
                </div>
                <Link 
                  to={`/skills/${skill.id}`} 
                  className="text-sm text-blue-600 hover:underline flex items-center"
                >
                  View details <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {editData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <SkillForm editData={editData} setEditData={setEditData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillList;