import React from 'react';
import { NavLink } from 'react-router-dom';

export const NavItem = ({ href, text, icon }) => {
  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        `flex items-center p-2 rounded-lg transition-colors duration-200 ${
          isActive
            ? 'bg-orange-400 text-white font-bold' // Classes pour le lien actif
            : 'text-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 hover:font-bold'
        }`
      }
    >
      {icon && <span className="mr-3">{icon}</span>}
      {text}
    </NavLink>
  );
};
