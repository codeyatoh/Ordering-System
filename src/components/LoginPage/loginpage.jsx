import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AiOutlineEye, AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import styles from './LoginPage.module.css';
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { UserContext } from '../../context/UserContext';

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);

  // Redirect to /admin after successful login, but only if not already there
  useEffect(() => {
    if (user && location.pathname !== '/admin') {
      navigate('/admin');
    }
  }, [user, navigate, location.pathname]);

  // Login handler with Firebase Auth
  const login = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter both email and password.');
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Login successful!');
      // No redirect here; handled by useEffect
    } catch (error) {
      toast.error('Invalid email or password.');
    } finally {
      setLoading(false);
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
          <button className={styles.submitButton} onClick={login} disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
