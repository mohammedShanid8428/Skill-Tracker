import { Home, LayoutDashboard, Code2, FolderKanban, BadgeCheck, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => (
  <div className="bg-gradient-to-br from-gray-50 to-gray-100">
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo/Brand */}
          <div className="flex-shrink-0 flex items-center">
            <Code2 className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">SkillTracker</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:ml-6 md:flex md:space-x-8">
            <Link
              to="/"
              className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
            >
              <Home className="w-5 h-5 mr-1" />
              Home
            </Link>
            <Link
              to="/dashboard"
              className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
            >
              <LayoutDashboard className="w-5 h-5 mr-1" />
              Dashboard
            </Link>
            <Link
              to="/skills"
              className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
            >
              <Code2 className="w-5 h-5 mr-1" />
              Skills
            </Link>
            <Link
              to="/projects"
              className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
            >
              <FolderKanban className="w-5 h-5 mr-1" />
              Projects
            </Link>
            <Link
              to="/certifications"
              className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
            >
              <BadgeCheck className="w-5 h-5 mr-1" />
              Certifications
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="block h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu (hidden by default) */}
      <div className="md:hidden hidden" id="mobile-menu">
        <div className="pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          >
            <div className="flex items-center">
              <Home className="w-5 h-5 mr-2" />
              Home
            </div>
          </Link>
          <Link
            to="/dashboard"
            className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          >
            <div className="flex items-center">
              <LayoutDashboard className="w-5 h-5 mr-2" />
              Dashboard
            </div>
          </Link>
          <Link
            to="/skills"
            className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          >
            <div className="flex items-center">
              <Code2 className="w-5 h-5 mr-2" />
              Skills
            </div>
          </Link>
          <Link
            to="/projects"
            className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          >
            <div className="flex items-center">
              <FolderKanban className="w-5 h-5 mr-2" />
              Projects
            </div>
          </Link>
          <Link
            to="/certifications"
            className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          >
            <div className="flex items-center">
              <BadgeCheck className="w-5 h-5 mr-2" />
              Certifications
            </div>
          </Link>
        </div>
      </div>
    </nav>
  </div>
);

export default Header;