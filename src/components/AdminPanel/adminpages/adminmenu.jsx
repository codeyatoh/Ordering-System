import React, { useState } from 'react';
import AdminSidebar from '../admin.sidebar';
import './admincrew.css';
import { FaSearch, FaFilter, FaEdit, FaTrash } from 'react-icons/fa';
import MenuAddModal from '../adminmodal/menuAddModal';
import MenuEditModal from '../adminmodal/menuEditModal';
import MenuRemoveModal from '../adminmodal/menuRemoveModal';

function AdminMenu() {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);
  return (
    <div className="adminpanel-root">
      <AdminSidebar />
      <main className="adminpanel-main">
        <div className="crew-header-row">
          <h2 className="crew-title">Menu Management</h2>
        </div>
        <div className="crew-actions-row">
          <button className="crew-add-btn" onClick={() => setAddModalOpen(true)}>Add</button>
          <div className="crew-search-container">
            <div className="crew-search-input-wrapper">
              <FaSearch className="crew-search-icon" />
              <input className="crew-search-input" type="text" placeholder="Search by Name or Category" />
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
                <th>item_id</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Availability</th>
                <th>Images</th>
                <th>Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="crew-id">001</td>
                <td className="crew-fname">Milktie</td>
                <td className="crew-lname">Price</td>
                <td className="crew-email">Coffee</td>
                <td className="crew-gender">Active</td>
                <td className="crew-status"></td>
                <td className="crew-created">02:06:12</td>
                <td className="crew-actions">
                  <button className="crew-action-btn" onClick={() => setEditModalOpen(true)}><FaEdit /></button>
                  <button className="crew-action-btn" onClick={() => setRemoveModalOpen(true)}><FaTrash /></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <MenuAddModal isOpen={addModalOpen} onClose={() => setAddModalOpen(false)} />
        <MenuEditModal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} />
        <MenuRemoveModal isOpen={removeModalOpen} onClose={() => setRemoveModalOpen(false)} onConfirm={() => setRemoveModalOpen(false)} />
      </main>
    </div>
  );
}

export default AdminMenu;
