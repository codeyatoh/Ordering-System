import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import styles from './LoginPage.module.css';

function LoginPage() {

  
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dining-location');
  };

  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.loginTitle}>Ordering System</h1>
      <div className={styles.loginCard}>
        <div className={styles.loginForm}>
          <h2 className={styles.formTitle}>Login</h2>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Email</label>
            <div className={styles.inputIconContainer}>
              <AiOutlineMail className={styles.inputIcon} />
              <input
                type="email"
                className={styles.inputField}
                placeholder="Enter your email"
              />
            </div>
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Password</label>
            <div className={styles.passwordInputContainer}>
              <AiOutlineLock className={styles.inputIcon} />
              <input
                type="password"
                className={styles.inputField}
                placeholder="Enter your password"
              />
              <button className={styles.passwordToggle}>
                <AiOutlineEye />
              </button>
            </div>
          </div>
          <button className={styles.submitButton} onClick={handleLogin}>
            Sign In
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
