import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaUtensils, FaClipboardList, FaMoneyCheckAlt, FaSignOutAlt } from 'react-icons/fa';
import logo from '../../assets/images/logo.png';
import './adminpanel.css';

function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <aside className="adminpanel-sidebar">
      <img src={logo} alt="Logo" className="adminpanel-logo" />
      <div className="adminpanel-title">Admin Panel</div>
      <nav className="adminpanel-nav">
        <button className={`adminpanel-nav-btn${location.pathname === '/admin' ? ' active' : ''}`} onClick={() => navigate('/admin')}><FaTachometerAlt className="adminpanel-nav-icon" /> Dashboard</button>
        <button className={`adminpanel-nav-btn${location.pathname === '/admin/crew' ? ' active' : ''}`} onClick={() => navigate('/admin/crew')}><FaUsers className="adminpanel-nav-icon" /> Crew</button>
        <button className="adminpanel-nav-btn"><FaUtensils className="adminpanel-nav-icon" /> Menu</button>
        <button className="adminpanel-nav-btn"><FaClipboardList className="adminpanel-nav-icon" /> Orders</button>
        <button className="adminpanel-nav-btn"><FaMoneyCheckAlt className="adminpanel-nav-icon" /> Payments</button>
        <button className="adminpanel-nav-btn logout"><FaSignOutAlt className="adminpanel-nav-icon" /> Logout</button>
      </nav>
    </aside>
  );
}

export default AdminSidebar;
