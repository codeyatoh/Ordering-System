import React, { useState } from 'react';
import { TbLogout } from 'react-icons/tb';
import logo from '../../assets/images/logo.png';
import LogoutModal from '../ModalOrder/LogoutModal';

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
          <p>Quality Coffee & Fresh Pastries</p>
          <div className="header-guide">Select a category, add items to your order, and review your list on the right.</div>
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