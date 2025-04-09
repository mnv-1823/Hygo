import React from 'react';
import { FaBell, FaUser, FaSignOutAlt } from 'react-icons/fa';

function Header({ user, onLogout }) {
  return (
    <header className="header">
      <div className="page-title">
        <h1>Admin Dashboard</h1>
      </div>
      <div className="header-actions">
        <div className="notifications">
          <FaBell />
          <span className="badge">3</span>
        </div>
        <div className="user-menu">
          <span className="user-name">{user?.name || 'Admin'}</span>
          <div className="avatar">
            <FaUser />
          </div>
          <div className="dropdown">
            <button className="logout-btn" onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;