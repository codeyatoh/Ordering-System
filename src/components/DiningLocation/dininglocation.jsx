import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './dininglocation.module.css'
import cardStyles from '../ui/cards/dine-take.module.css'
import Logo from '../../assets/images/logo.png'
import DineIn from "../ui/cards/dine-in";
import TakeOut from "../ui/cards/take-out";
import { TbLogout } from 'react-icons/tb';
import { UserContext } from '../../context/UserContext';
import { toast } from 'react-toastify';

function DiningLocation() {
  const navigate = useNavigate();
  const { crew, logoutCrew } = useContext(UserContext);
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => {
    logoutCrew();
    toast.success('Logged out successfully!');
    navigate('/');
  };

  const openLogout = () => setShowLogout(true);
  const closeLogout = () => setShowLogout(false);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={Logo} alt="AJH Logo" className={styles.logo} />
        <h1 className={styles.title}>Dining Location</h1>
        {crew && (
          <div className={styles.crewInfo}>
            <span>Welcome, {crew.firstName} {crew.lastName}</span>
            <button className={styles.logoutBtn} onClick={openLogout}>
              <TbLogout />
            </button>
          </div>
        )}
      </div>
      <div className={cardStyles.optionsContainer}>
        <DineIn />
        <TakeOut />
      </div>
      
      {/* Logout Modal */}
      {showLogout && (
        <div className={styles.logoutModalOverlay}>
          <div className={styles.logoutModal}>
            <h3>Logout</h3>
            <p>Are you sure you want to logout?</p>
            <div className={styles.logoutActions}>
              <button onClick={closeLogout}>Cancel</button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DiningLocation