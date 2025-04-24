import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  PenLine, 
  BarChart, 
  Calendar, 
  Settings, 
  Menu, 
  X, 
  Sun, 
  Moon,
  Sparkles 
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <PenLine className="h-6 w-6 text-primary-600" />
          <span className="text-xl font-semibold text-gray-900 dark:text-white">ReflectAI</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <NavLink to="/" active={isActive('/')} onClick={closeMenu}>
            <PenLine className="h-5 w-5 mr-1" />
            Journal
          </NavLink>

          <NavLink to="/insights" active={isActive('/insights')} onClick={closeMenu}>
            <BarChart className="h-5 w-5 mr-1" />
            Insights
          </NavLink>

          <NavLink to="/calendar" active={isActive('/calendar')} onClick={closeMenu}>
            <Calendar className="h-5 w-5 mr-1" />
            Calendar
          </NavLink>

          <NavLink to="/reflect" active={isActive('/reflect')} onClick={closeMenu}>
            <Sparkles className="h-5 w-5 mr-1" />
            Reflect
          </NavLink>

          <NavLink to="/settings" active={isActive('/settings')} onClick={closeMenu}>
            <Settings className="h-5 w-5 mr-1" />
            Settings
          </NavLink>

          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden gap-2">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>
          <button
            onClick={toggleMenu}
            className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-white dark:bg-gray-800 shadow-md"
        >
          <nav className="container mx-auto px-4 py-3 flex flex-col space-y-1">
            <NavLink to="/" active={isActive('/')} onClick={closeMenu}>
              <PenLine className="h-5 w-5 mr-2" />
              Journal
            </NavLink>

            <NavLink to="/insights" active={isActive('/insights')} onClick={closeMenu}>
              <BarChart className="h-5 w-5 mr-2" />
              Insights
            </NavLink>

            <NavLink to="/calendar" active={isActive('/calendar')} onClick={closeMenu}>
              <Calendar className="h-5 w-5 mr-2" />
              Calendar
            </NavLink>

            <NavLink to="/reflect" active={isActive('/reflect')} onClick={closeMenu}>
              <Sparkles className="h-5 w-5 mr-2" />
              Reflect
            </NavLink>

            <NavLink to="/settings" active={isActive('/settings')} onClick={closeMenu}>
              <Settings className="h-5 w-5 mr-2" />
              Settings
            </NavLink>
          </nav>
        </motion.div>
      )}
    </header>
  );
};

interface NavLinkProps {
  to: string;
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, active, onClick, children }) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        active
          ? 'text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
      }`}
    >
      {children}
    </Link>
  );
};