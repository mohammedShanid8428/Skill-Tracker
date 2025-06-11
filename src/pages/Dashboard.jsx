import React from "react";
import { Link } from "react-router-dom";
import { BarChart3, BadgeCheck, FolderKanban } from "lucide-react";

export default function Dashboard() {
  const stats = [
    { name: "Skills", count: 12, icon: <BarChart3 className="w-5 h-5" />, color: "bg-blue-500" },
    { name: "Projects", count: 5, icon: <FolderKanban className="w-5 h-5" />, color: "bg-green-500" },
    { name: "Certifications", count: 3, icon: <BadgeCheck className="w-5 h-5" />, color: "bg-purple-500" },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome to SkillTracker</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white rounded-2xl shadow p-6 border hover:shadow-lg transition"
          >
            <div className={`w-10 h-10 flex items-center justify-center rounded-full text-white ${stat.color} mb-4`}>
              {stat.icon}
            </div>
            <h2 className="text-xl font-semibold text-gray-700">{stat.name}</h2>
            <p className="text-3xl font-bold text-gray-900">{stat.count}</p>
            <Link to={`/${stat.name.toLowerCase()}`} className="text-sm text-blue-600 hover:underline mt-2 inline-block">
              View {stat.name}
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-10 text-sm text-gray-600">
        Use this dashboard to manage and track your skills, showcase your projects, and keep record of your certifications. Update regularly to reflect your growth.
      </div>
    </div>
  );
}
