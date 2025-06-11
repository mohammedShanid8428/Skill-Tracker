import { Home, LayoutDashboard, Code2, Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center">
              <Code2 className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">SkillTracker</span>
            </div>
            <p className="mt-4 text-gray-600">
              Track and showcase your skills, projects, and certifications in one place.
              Build your professional portfolio effortlessly.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Quick Links
            </h3>
            <nav className="space-y-3">
              <Link to="/" className="flex items-center text-gray-600 hover:text-indigo-500 transition-colors">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Link>
              <Link to="/dashboard" className="flex items-center text-gray-600 hover:text-indigo-500 transition-colors">
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Dashboard
              </Link>
              <Link to="/skills" className="flex items-center text-gray-600 hover:text-indigo-500 transition-colors">
                <Code2 className="w-4 h-4 mr-2" />
                Skills
              </Link>
            </nav>
          </div>

          {/* Connect Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Connect With Us
            </h3>
            <div className="flex space-x-4">
              <a href="https://github.com" className="text-gray-500 hover:text-indigo-600 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" className="text-gray-500 hover:text-indigo-600 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" className="text-gray-500 hover:text-indigo-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="mailto:contact@example.com" className="text-gray-500 hover:text-indigo-600 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <div className="mt-4">
              <a href="mailto:contact@skilltracker.com" className="text-gray-600 hover:text-indigo-600 text-sm flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                contact@skilltracker.com
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm flex items-center">
            Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> by SkillTracker Team
          </p>
          <p className="text-gray-500 text-sm mt-4 md:mt-0">
            &copy; {new Date().getFullYear()} SkillTracker. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;