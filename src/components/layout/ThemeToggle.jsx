// src/components/layout/ThemeToggle.jsx
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../hooks/UseTheme';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-700 dark:text-white transition-colors duration-200"
      aria-label="Toggle dark mode"
    >
      {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
    </button>
  );
};

export default ThemeToggle;