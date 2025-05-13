import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import GlassCard from './GlassCard';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className="fixed top-0 left-0 right-0 z-30">
      <GlassCard className="backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-primary-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 md:hidden transition-colors duration-200"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </button>
              <Link to="/" className="flex items-center ml-2 md:ml-0 group">
                <span className="font-bold text-xl bg-gradient-to-r from-primary-500 to-purple-600 bg-clip-text text-transparent group-hover:opacity-80 transition-opacity duration-200">
                  ResumeAI
                </span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors duration-200"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5 text-yellow-400" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-500" />
                )}
              </button>
              <div className="hidden md:flex items-center space-x-2">
                <span className="bg-gradient-to-r from-primary-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
                  Pro
                </span>
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-purple-600 flex items-center justify-center text-white font-semibold shadow-lg">
                  JD
                </div>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>
    </header>
  );
};

export default Header;