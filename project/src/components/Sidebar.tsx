import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, UploadCloud, FileText, Users, Settings, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, closeSidebar }) => {
  const { theme } = useTheme();
  
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <Home size={20} /> },
    { name: 'Upload Resumes', path: '/upload', icon: <UploadCloud size={20} /> },
    { name: 'Job Description', path: '/job-description', icon: <FileText size={20} /> },
    { name: 'Candidates', path: '/candidates', icon: <Users size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  const activeClass = `flex items-center space-x-3 text-blue-600 ${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-50'} px-4 py-3 rounded-lg font-medium`;
  const inactiveClass = `flex items-center space-x-3 text-gray-500 hover:bg-gray-100 hover:text-blue-600 px-4 py-3 rounded-lg transition-colors duration-200 ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside 
        className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} fixed z-50 top-0 left-0 h-full w-64 transform transition-transform duration-300 ease-in-out border-r ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:z-0 md:h-auto overflow-y-auto`}
      >
        <div className="p-4 flex justify-between items-center md:hidden">
          <h2 className="font-bold text-xl bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">ResumeAI</h2>
          <button 
            onClick={closeSidebar}
            className="p-1 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mt-16 md:mt-6 px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => isActive ? activeClass : inactiveClass}
              onClick={closeSidebar}
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;