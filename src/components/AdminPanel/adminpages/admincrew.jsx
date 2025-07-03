import React, { useState, useEffect } from 'react';
import AdminSidebar from '../admin.sidebar';
import './admincrew.css';
import { FaSearch, FaFilter, FaEdit, FaTrash } from 'react-icons/fa';
import CrewEditModal from '../adminmodal/crewEditModal';
import { db } from '../../../firebase';
import { collection, addDoc, getDocs, Timestamp } from 'firebase/firestore';

function AdminCrew() {
  const [modalOpen, setModalOpen] = useState(false);
  const [crewList, setCrewList] = useState([]);

  // Fetch crew list from Firestore
  useEffect(() => {
    const fetchCrew = async () => {
      const querySnapshot = await getDocs(collection(db, 'crew'));
      const crewData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCrewList(crewData);
    };
    fetchCrew();
  }, []);

  // Add new crew to Firestore
  const handleAddCrew = async (crewData) => {
    const createdAt = Timestamp.now();
    await addDoc(collection(db, 'crew'), { ...crewData, createdAt });
    // Refresh crew list
    const querySnapshot = await getDocs(collection(db, 'crew'));
    const crewDataList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setCrewList(crewDataList);
    setModalOpen(false);
  };

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
              {crewList.length === 0 ? (
                <tr><td colSpan="8" style={{ textAlign: 'center' }}>No crew found.</td></tr>
              ) : (
                crewList.map((crew, idx) => (
                  <tr key={crew.id}>
                    <td className="crew-id">{String(idx + 1).padStart(4, '0')}</td>
                    <td className="crew-fname">{crew.firstName}</td>
                    <td className="crew-lname">{crew.lastName}</td>
                    <td className="crew-email">{crew.email}</td>
                    <td className="crew-gender"><b>{crew.gender}</b></td>
                    <td className="crew-status"><b>{crew.status}</b></td>
                    <td className="crew-created"><b>{crew.createdAt && crew.createdAt.toDate ? crew.createdAt.toDate().toLocaleDateString() : ''}</b></td>
                    <td className="crew-actions">
                      <button className="crew-action-btn" disabled><FaEdit /></button>
                      <button className="crew-action-btn" disabled><FaTrash /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <CrewEditModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSave={handleAddCrew} />
      </main>
    </div>
  );
}

export default AdminCrew;
