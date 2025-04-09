import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaPills, FaUsers, FaCog } from 'react-icons/fa';

function Sidebar() {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <h2>PillReminder</h2>
      </div>
      <nav className="menu">
        <Link to="/dashboard" className={isActive('/dashboard') ? 'active' : ''}>
          <FaHome /> Dashboard
        </Link>
        <Link to="/medications" className={isActive('/medications') ? 'active' : ''}>
          <FaPills /> Medications
        </Link>
        <Link to="/users" className={isActive('/users') ? 'active' : ''}>
          <FaUsers /> Users
        </Link>
        <Link to="/settings" className={isActive('/settings') ? 'active' : ''}>
          <FaCog /> Settings
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;