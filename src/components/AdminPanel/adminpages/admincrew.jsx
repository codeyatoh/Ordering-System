import React, { useState } from 'react';
import AdminSidebar from '../admin.sidebar';
import './admincrew.css';
import { FaSearch, FaFilter, FaEdit, FaTrash } from 'react-icons/fa';
import CrewEditModal from '../adminmodal/crewEditModal';

function AdminCrew() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="adminpanel-root">
      <AdminSidebar />
      <main className="adminpanel-main">
        <div className="crew-header-row">
          <h2 className="crew-title">Crew Management</h2>
        </div>
        <div className="crew-actions-row">
          <button className="crew-add-btn" onClick={() => setModalOpen(true)}>Add</button>
          <div className="crew-search-container">
            <div className="crew-search-input-wrapper">
              <FaSearch className="crew-search-icon" />
              <input className="crew-search-input" type="text" placeholder="Search by Order ID or Payment ID" />
            </div>
            <button className="crew-search-filter-btn">
              <FaFilter />
            </button>
          </div>
        </div>
        <div className="crew-table-container">
          <table className="crew-table">
            <thead>
              <tr>
                <th>Crew Id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="crew-id">0001</td>
                <td className="crew-fname">John Christian</td>
                <td className="crew-lname">Saporno</td>
                <td className="crew-email">bunsai090@gmail.com</td>
                <td className="crew-gender"><b>Male</b></td>
                <td className="crew-status"><b>Active</b></td>
                <td className="crew-created"><b>03-07-2025</b></td>
                <td className="crew-actions">
                  <button className="crew-action-btn"><FaEdit /></button>
                  <button className="crew-action-btn"><FaTrash /></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <CrewEditModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </main>
    </div>
  );
}

export default AdminCrew;
