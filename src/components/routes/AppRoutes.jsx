import { Routes, Route, Navigate } from 'react-router-dom'
import React, { useContext } from 'react';
import LoginPage from '../LoginPage/loginpage'
import DiningLocation from '../DiningLocation/dininglocation'
import CoffeeShop from '../CoffeeShop/CoffeeShop'
import Admindashboard from '../AdminPanel/adminpages/admindashboard';
import AdminCrew from '../AdminPanel/adminpages/admincrew';
import { UserContext } from '../../context/UserContext';

function ProtectedRoute({ children }) {
  const { user } = useContext(UserContext);
  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dining-location" element={<DiningLocation />} />
      <Route path="/coffee-shop" element={<CoffeeShop />} />
      <Route path="/admin" element={
        <ProtectedRoute>
          <Admindashboard />
        </ProtectedRoute>
      } />
      <Route path="/admin/crew" element={
        <ProtectedRoute>
          <AdminCrew />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default AppRoutes;