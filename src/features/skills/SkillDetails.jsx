// src/features/skills/SkillDetails.jsx
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Pencil, Trash2, ArrowLeft } from 'lucide-react';
import { fetchSkillById, deleteSkill, clearCurrentSkill } from './SkillSlice';
import toast from 'react-hot-toast';

const SkillDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentSkill, status } = useSelector((state) => state.skills);

  useEffect(() => {
    if (id) dispatch(fetchSkillById(id));
    return () => dispatch(clearCurrentSkill());
  }, [dispatch, id]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      dispatch(deleteSkill(id))
        .unwrap()
        .then(() => {
          toast.success('Skill deleted successfully');
          navigate('/skills');
        })
        .catch(() => {
          toast.error('Failed to delete skill');
        });
    }
  };

  const handleEdit = () => {
    navigate(`/skills/edit/${id}`);
  };

  if (status === 'loading') {
    return <div className="text-center mt-20">Loading skill details...</div>;
  }

  if (!currentSkill) {
    return (
      <div className="text-center mt-20 text-gray-500 text-lg">
        Skill not found.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 px-6">
      <button
        onClick={() => navigate('/skills')}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
      >
        <ArrowLeft className="h-5 w-5 mr-1" /> Back to Skills
      </button>

      <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200">
        <img
          src={currentSkill.imageUrl}
          alt={currentSkill.name}
          className="w-full h-64 object-cover"
          onError={(e) => {
            e.target.src = "";
          }}
        />

        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold text-gray-800">{currentSkill.name}</h2>
            <div className="flex gap-4">
              <button
                onClick={handleEdit}
                className="flex items-center px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200"
              >
                <Pencil className="w-4 h-4 mr-1" /> Edit
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
              >
                <Trash2 className="w-4 h-4 mr-1" /> Delete
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Description</h3>
              <p className="text-gray-700 mb-4">{currentSkill.description}</p>

              <h3 className="text-lg font-semibold text-gray-700 mb-2">Category</h3>
              <p className="text-gray-700 mb-4">{currentSkill.category}</p>

              <h3 className="text-lg font-semibold text-gray-700 mb-2">Progress</h3>
              <div className="mb-4">
                <div className="w-full h-3 bg-gray-200 rounded-full">
                  <div
                    className="h-3 bg-blue-500 rounded-full"
                    style={{ width: `${currentSkill.progress}%` }}
                  />
                </div>
                <p className="text-gray-700 mt-1">{currentSkill.progress}% complete</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Goal Date</h3>
              <p className="text-gray-700 mb-4">
                {currentSkill.goal ? new Date(currentSkill.goal).toLocaleDateString() : 'N/A'}
              </p>

              <h3 className="text-lg font-semibold text-gray-700 mb-2">Notes</h3>
              <p className="text-gray-700 mb-4 whitespace-pre-line">
                {currentSkill.notes || 'No notes added'}
              </p>
            </div>
          </div>

          {currentSkill.courses?.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Recommended Courses</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {currentSkill.courses.map((course, index) => (
                  <li key={index}>{course}</li>
                ))}
              </ul>
            </div>
          )}

          {currentSkill.relatedProjects?.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Related Projects</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {currentSkill.relatedProjects.map((project, index) => (
                  <li key={index}>{project}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillDetails;
