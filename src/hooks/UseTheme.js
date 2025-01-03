// src/hooks/useTheme.js
import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const darkModePreference = localStorage.getItem('darkMode');
    if (darkModePreference === 'true') {
      setIsDarkMode(true);
    }
  }, []);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  return { isDarkMode, toggleTheme };
};
