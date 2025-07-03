import React from 'react';
import AdminSidebar from '../admin.sidebar';
import '../adminpanel.css';

function Admindashboard() {
  return (
    <div className="adminpanel-root">
      <AdminSidebar />
      <main className="adminpanel-main">
        {/* Main content goes here */}
      </main>
    </div>
  );
}

export default Admindashboard; 