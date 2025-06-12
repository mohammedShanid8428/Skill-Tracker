import React from "react";
import { Link } from "react-router-dom";
import { BarChart3, BadgeCheck, FolderKanban } from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      name: "Skills",
      count: 12,
      icon: <BarChart3 className="w-5 h-5" />,
      color: "bg-blue-500",
      link: "/skills",
    },
    {
      name: "Projects",
      count: 5,
      icon: <FolderKanban className="w-5 h-5" />,
      color: "bg-green-500",
      link: "/projects",
    },
    {
      name: "Certifications",
      count: 3,
      icon: <BadgeCheck className="w-5 h-5" />,
      color: "bg-purple-500",
      link: "/certifications",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h1 className="text-4xl font-extrabold text-blue-800 mb-10 text-center drop-shadow">
          Welcome to SkillTracker
        </h1>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow hover:shadow-xl transition duration-300"
            >
              <div
                className={`w-12 h-12 flex items-center justify-center rounded-full text-white ${stat.color} mb-4`}
              >
                {stat.icon}
              </div>
              <h2 className="text-xl font-semibold text-gray-700 mb-1">{stat.name}</h2>
              <p className="text-4xl font-bold text-gray-900 mb-3">{stat.count}</p>
              <Link
                to={stat.link}
                className="text-sm text-blue-600 font-medium hover:underline"
              >
                View {stat.name}
              </Link>
            </div>
          ))}
        </div>

        {/* Footer Text */}
        <div className="mt-16 text-center text-gray-600 text-sm max-w-2xl mx-auto">
          Use this dashboard to manage and track your skills, showcase your projects,
          and maintain certifications. Update regularly to reflect your growth and achievements.
        </div>
      </div>
    </div>
  );
}
