import {
  Home,
  LayoutDashboard,
  Code2,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Heart,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-900 to-blue-800 text-white text-sm">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center md:items-start space-y-6 md:space-y-0 md:space-x-12">
        {/* Brand */}
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <Code2 className="h-5 w-5 text-cyan-400" />
            <span className="ml-2 font-bold text-lg">SkillTracker</span>
          </div>
          <p className="text-blue-100 leading-snug max-w-sm">
            Track and showcase your skills, projects, and certifications in one
            place. Build your professional portfolio effortlessly.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex-1">
          <h3 className="text-white font-semibold mb-3 uppercase text-xs tracking-wider">
            Quick Links
          </h3>
          <nav className="flex flex-col space-y-2 text-blue-200">
            <Link to="/" className="hover:text-cyan-300 flex items-center">
              <Home className="w-4 h-4 mr-2" />
              Home
            </Link>
            <Link
              to="/dashboard"
              className="hover:text-cyan-300 flex items-center"
            >
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Dashboard
            </Link>
            <Link to="/skills" className="hover:text-cyan-300 flex items-center">
              <Code2 className="w-4 h-4 mr-2" />
              Skills
            </Link>
          </nav>
        </div>

        {/* Connect With Us */}
        <div className="flex-1">
          <h3 className="text-white font-semibold mb-3 uppercase text-xs tracking-wider">
            Connect With Us
          </h3>
          <div className="flex space-x-4 text-blue-300 mb-2">
            <a href="https://github.com" className="hover:text-cyan-300">
              <Github className="h-4 w-4" />
            </a>
            <a href="https://linkedin.com" className="hover:text-cyan-300">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href="https://twitter.com" className="hover:text-cyan-300">
              <Twitter className="h-4 w-4" />
            </a>
            <a href="mailto:contact@skilltracker.com" className="hover:text-cyan-300">
              <Mail className="h-4 w-4" />
            </a>
          </div>
          <a
            href="mailto:contact@skilltracker.com"
            className="text-blue-100 hover:text-cyan-300 flex items-center"
          >
            <Mail className="w-4 h-4 mr-2" />
            contact@skilltracker.com
          </a>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-blue-700 text-center py-3 px-4 text-blue-200 text-xs">
        <p className="flex justify-center items-center flex-wrap gap-1">
          Made with
          <Heart className="h-3 w-3 text-red-500 mx-1" fill="red" />
          by <span className="text-white font-semibold">Mohammed Shanid .T</span>
          &copy; {new Date().getFullYear()} SkillTracker. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
