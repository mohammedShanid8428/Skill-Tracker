import { useState } from "react";
import {
  Home,
  LayoutDashboard,
  Code2,
  FolderKanban,
  BadgeCheck,
  Menu,
  X
} from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home", icon: <Home className="w-5 h-5 mr-1" /> },
    { to: "/dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5 mr-1" /> },
    { to: "/skills", label: "Skills", icon: <Code2 className="w-5 h-5 mr-1" /> },
    
  ];

  return (
    <header className="bg-gradient-to-r from-indigo-900 to-blue-800 text-white shadow-lg sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Code2 className="h-8 w-8 text-cyan-400" />
            <span className="ml-2 text-2xl font-bold tracking-tight text-white">
              SkillTracker
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            {navLinks.map(({ to, label, icon }) => (
              <Link
                key={label}
                to={to}
                className="flex items-center gap-1 text-md font-medium hover:text-cyan-300 transition"
              >
                {icon}
                {label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Panel */}
      {menuOpen && (
        <div className="md:hidden bg-indigo-950 border-t border-blue-700">
          <div className="px-4 pt-3 pb-4 space-y-2">
            {navLinks.map(({ to, label, icon }) => (
              <Link
                key={label}
                to={to}
                onClick={() => setMenuOpen(false)}
                className="flex items-center px-3 py-2 rounded-md text-md font-medium text-white hover:bg-blue-700 transition"
              >
                {icon}
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
