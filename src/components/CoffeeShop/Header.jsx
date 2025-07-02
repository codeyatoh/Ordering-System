import React from 'react';
import { TbLogout } from 'react-icons/tb';
import logo from '../../assets/images/logo.png';

function Header() {
  const handleLogout = () => {
    // Add logout logic here
    console.log('Logout clicked');
  };

  return (
    <header className="header">
      <div className="header-flex">
        <img src={logo} alt="Logo" className="header-logo" />
        <div className="header-center">
          <p>Quality Coffee & Fresh Pastries</p>
          <div className="header-guide">Select a category, add items to your order, and review your list on the right.</div>
        </div>
        <button className="logout-icon-btn" onClick={handleLogout}>
          <TbLogout className="logout-icon" />
        </button>
      </div>
    </header>
  );
}

export default Header; 