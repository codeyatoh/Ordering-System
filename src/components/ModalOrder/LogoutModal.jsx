import React from 'react';
import styles from './LogoutModal.module.css';
import logo from '../../assets/images/logo.png';

function LogoutModal({ isOpen, onClose, onLogout }) {
  if (!isOpen) return null;

  return (
    <div className={styles['modal-overlay']}>
      <div className={styles['modal-box']}>
        <div className={styles['logout-modal-content']}>
          <img src={logo} alt="Logo" className={styles['logout-modal-logo']} />
          <h2 className={styles['logout-modal-title']}>Logout Confirmation</h2>
          <p className={styles['logout-modal-message']}>
            Are you sure you want to logout?
          </p>
          <div className={styles['logout-modal-footer']}>
            <button className={styles['logout-modal-cancel-btn']} onClick={onClose}>Cancel</button>
            <button className={styles['logout-modal-logout-btn']} onClick={onLogout}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogoutModal; 