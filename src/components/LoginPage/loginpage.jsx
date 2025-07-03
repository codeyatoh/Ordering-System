import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import styles from './LoginPage.module.css';
import { toast } from 'react-toastify';
import { UserContext } from '../../context/UserContext';
// import { handleLogin } from '../../handlers/authHandlers';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(UserContext);

  // Login handler with role-based redirect
  const login = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter both email and password.');
      return;
    }
    if (email === 'admin@example.com' && password === 'admin123') {
      setUser({ role: 'admin' });
      toast.success('Login successful!');
      setTimeout(() => navigate('/admin'), 1200);
    } else if (email === 'crew@example.com' && password === 'crew123') {
      setUser({ role: 'crew' });
      toast.success('Login successful!');
      setTimeout(() => navigate('/dining-location'), 1200);
    } else {
      toast.error('Invalid email or password.');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.loginTitle}>Ordering Management System</h1>
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
                value={email}
                onChange={e => setEmail(e.target.value)}
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
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button className={styles.passwordToggle} type="button">
                <AiOutlineEye />
              </button>
            </div>
          </div>
          <button className={styles.submitButton} onClick={login}>
            Sign In
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
