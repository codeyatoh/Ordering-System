import React, { useState } from 'react';
import { TbLogout } from 'react-icons/tb';
import logo from '../../assets/images/logo.png';
import LogoutModal from '../Modal/LogoutModal';

function Header() {
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => {
    setShowLogout(true);
  };

  const handleClose = () => {
    setShowLogout(false);
  };

  const handleConfirmLogout = () => {
    setShowLogout(false);
    // Add actual logout logic here (e.g., redirect, clear session, etc.)
    console.log('User logged out');
  };

  return (
    <header className="header">
      <div className="header-flex">
        <img src={logo} alt="Logo" className="header-logo" />
        <div className="header-center">
          <div className="instructions-box">Instructions:</div>
          <div className="header-guide">Select a category,<br />add items to your order, and review your list on the right</div>
        </div>
        <button className="logout-icon-btn" onClick={handleLogout}>
          <TbLogout className="logout-icon" />
        </button>
      </div>
      <LogoutModal isOpen={showLogout} onClose={handleClose} onLogout={handleConfirmLogout} />
    </header>
  );
}

export default Header; 