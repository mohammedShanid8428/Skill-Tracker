import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Pencil,
  Trash2,
  ArrowLeft,
  Notebook,
  BookOpen,
  CalendarDays,
  BadgeCheck,
  LayoutDashboard,
  ImageOff,
} from 'lucide-react';
import { Player } from '@lottiefiles/react-lottie-player';
import { fetchSkillById, deleteSkill, clearCurrentSkill } from './SkillSlice';
import toast from 'react-hot-toast';

const SkillDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentSkill, status, error } = useSelector((state) => state.skills);

  const [lottieFailed, setLottieFailed] = useState(false);

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
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        {!lottieFailed ? (
          <Player
            autoplay
            loop
            src="https://assets3.lottiefiles.com/packages/lf20_usmfx6bp.json"
            style={{ height: "200px", width: "200px" }}
            onEvent={(e) => {
              if (e === "error") setLottieFailed(true);
            }}
          />
        ) : (
          <>
            <LoaderCircle className="animate-spin w-6 h-6 mb-2" />
            Loading skill details...
          </>
        )}
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="text-center mt-20 text-red-500 text-lg">
        {error || "Failed to load skill details."}
      </div>
    );
  }

  if (!currentSkill) {
    return (
      <div className="text-center mt-20 text-gray-500 text-lg">
        <Player
            autoplay
            loop
            src="https://assets3.lottiefiles.com/packages/lf20_usmfx6bp.json"
            style={{ height: "200px", width: "200px" }}
            onEvent={(e) => {
              if (e === "error") setLottieFailed(true);
            }}
          />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 mt-8 space-y-6 bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Back Button */}
      <button
        onClick={() => navigate('/skills')}
        className="flex items-center text-blue-600 hover:text-blue-800 transition mb-2"
      >
        <ArrowLeft className="h-5 w-5 mr-2" /> Back to Skills
      </button>

      {/* Header & Image */}
      <div className="bg-white shadow-md rounded-xl border overflow-hidden">
        <div className="w-full h-56 bg-gray-100 flex items-center justify-center">
          {currentSkill.imageUrl ? (
            <img
              src={currentSkill.imageUrl}
              alt={currentSkill.name}
              className="w-full h-full object-cover"
              onError={(e) => (e.target.src = '')}
            />
          ) : (
            <div className="text-gray-400 text-center">
              <ImageOff className="mx-auto h-8 w-8" />
              <p className="text-sm mt-1">No Image</p>
            </div>
          )}
        </div>

        {/* Title and Actions */}
        <div className="p-5">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
              <Notebook className="h-5 w-5 text-blue-500" />
              {currentSkill.name}
            </h2>

            <div className="flex gap-3">
              <button
                onClick={handleEdit}
                className="flex items-center gap-1 px-3 py-1.5 text-sm bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200"
              >
                <Pencil className="w-4 h-4" /> Edit
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center gap-1 px-3 py-1.5 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
              >
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Skill Info */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-xl shadow-sm border space-y-4">
          <div>
            <h3 className="flex items-center gap-2 text-gray-700 font-medium mb-1">
              <BookOpen className="w-5 h-5 text-blue-500" />
              Description
            </h3>
            <p className="text-gray-600">{currentSkill.description}</p>
          </div>

          <div>
            <h3 className="flex items-center gap-2 text-gray-700 font-medium mb-1">
              <LayoutDashboard className="w-5 h-5 text-blue-500" />
              Category
            </h3>
            <p className="text-gray-600">{currentSkill.category}</p>
          </div>

          <div>
            <h3 className="flex items-center gap-2 text-gray-700 font-medium mb-1">
              <BadgeCheck className="w-5 h-5 text-blue-500" />
              Progress
            </h3>
            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-600"
                style={{ width: `${currentSkill.progress}%` }}
              />
            </div>
            <p className="text-sm text-gray-500 mt-1">{currentSkill.progress}% complete</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border space-y-4">
          <div>
            <h3 className="flex items-center gap-2 text-gray-700 font-medium mb-1">
              <CalendarDays className="w-5 h-5 text-blue-500" />
              Goal Date
            </h3>
            <p className="text-gray-600">
              {currentSkill.goal ? new Date(currentSkill.goal).toLocaleDateString() : 'N/A'}
            </p>
          </div>

          <div>
            <h3 className="flex items-center gap-2 text-gray-700 font-medium mb-1">
              <Notebook className="w-5 h-5 text-blue-500" />
              Notes
            </h3>
            <p className="text-gray-600 whitespace-pre-line">
              {currentSkill.notes || 'No notes added'}
            </p>
          </div>
        </div>
      </div>

      {/* Courses & Related Projects */}
      <div className="grid md:grid-cols-2 gap-6">
        {currentSkill.courses?.length > 0 && (
          <div className="bg-white p-5 rounded-xl shadow-sm border space-y-3">
            <h3 className="text-gray-700 font-medium flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-500" />
              Recommended Courses
            </h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {currentSkill.courses.map((course, index) => (
                <li key={index}>{course}</li>
              ))}
            </ul>
          </div>
        )}

        {currentSkill.relatedProjects?.length > 0 && (
          <div className="bg-white p-5 rounded-xl shadow-sm border space-y-3">
            <h3 className="text-gray-700 font-medium flex items-center gap-2">
              <LayoutDashboard className="w-5 h-5 text-blue-500" />
              Related Projects
            </h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {currentSkill.relatedProjects.map((project, index) => (
                <li key={index}>{project}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillDetails;
