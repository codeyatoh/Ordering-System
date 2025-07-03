import React, { useState, useEffect } from 'react';
import AdminSidebar from '../admin.sidebar';
import './admincrew.css';
import { FaSearch, FaFilter, FaEdit, FaTrash } from 'react-icons/fa';
import CrewEditModal from '../adminmodal/crewEditModal';
import { db } from '../../../firebase';
import { collection, addDoc, getDocs, Timestamp, updateDoc, doc, runTransaction } from 'firebase/firestore';
import DeleteCrewModal from './deletecrew.jsx';
import EditCrewModal from './editcrew.jsx';
import SearchAndFilter from './search.jsx';

function AdminCrew() {
  const [modalOpen, setModalOpen] = useState(false);
  const [crewList, setCrewList] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCrew, setSelectedCrew] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  // Fetch crew list from Firestore
  useEffect(() => {
    const fetchCrew = async () => {
      const querySnapshot = await getDocs(collection(db, 'crew'));
      const crewData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCrewList(crewData);
    };
    fetchCrew();
  }, []);

  // Add new crew to Firestore with unique, non-reusable crew_id
  const handleAddCrew = async (crewData) => {
    const createdAt = Timestamp.now();
    // Use Firestore transaction to increment and fetch the next crew_id
    let newCrewId;
    await runTransaction(db, async (transaction) => {
      const counterRef = doc(db, 'counters', 'crew_id');
      const counterSnap = await transaction.get(counterRef);
      let lastId = 0;
      if (counterSnap.exists()) {
        lastId = counterSnap.data().last_id || 0; 
      }
      newCrewId = lastId + 1;
      transaction.set(counterRef, { last_id: newCrewId }, { merge: true });
    });
    // Add crew with crew_id
    await addDoc(collection(db, 'crew'), { ...crewData, createdAt, crew_id: newCrewId });
    // Refresh crew list
    const querySnapshot = await getDocs(collection(db, 'crew'));
    const crewDataList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setCrewList(crewDataList);
    setModalOpen(false);
  };

  // Archive crew (set status to Archived)
  const handleArchiveCrew = async () => {
    if (!selectedCrew) return;
    const { id } = selectedCrew;
    await updateDoc(doc(db, 'crew', id), { status: 'Archived' });
    // Refresh crew list
    const querySnapshot = await getDocs(collection(db, 'crew'));
    const crewDataList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setCrewList(crewDataList);
    setDeleteModalOpen(false);
    setSelectedCrew(null);
  };

  // Edit crew in Firestore
  const handleEditCrew = async (updatedData) => {
    if (!selectedCrew) return;
    const { id } = selectedCrew;
    await updateDoc(doc(db, 'crew', id), updatedData);
    // Refresh crew list
    const querySnapshot = await getDocs(collection(db, 'crew'));
    const crewDataList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setCrewList(crewDataList);
    setEditModalOpen(false);
    setSelectedCrew(null);
  };

  // Only show Active and Inactive crew (never show Archived)
  let visibleCrew = crewList.filter(crew => crew.status === 'Active' || crew.status === 'Inactive');
  if (filterStatus !== 'All') {
    visibleCrew = visibleCrew.filter(crew => crew.status === filterStatus);
  }
  // Search filter
  if (searchTerm.trim() !== '') {
    const term = searchTerm.trim().toLowerCase();
    visibleCrew = visibleCrew.filter(crew =>
      (crew.firstName && crew.firstName.toLowerCase().includes(term)) ||
      (crew.lastName && crew.lastName.toLowerCase().includes(term)) ||
      (crew.email && crew.email.toLowerCase().includes(term)) ||
      (crew.crew_id && String(crew.crew_id).padStart(4, '0').includes(term))
    );
  }
  // Sort by crew_id ascending
  visibleCrew.sort((a, b) => (a.crew_id || 0) - (b.crew_id || 0));

  return (
    <div className="adminpanel-root">
      <AdminSidebar />
      <main className="adminpanel-main">
        <div className="crew-header-row">
          <h2 className="crew-title">Crew Management</h2>
        </div>
        <div className="crew-actions-row">
          <button className="crew-add-btn" onClick={() => setModalOpen(true)}>Add</button>
          <SearchAndFilter
            searchTerm={searchTerm}
            onSearch={setSearchTerm}
            filterStatus={filterStatus}
            onFilter={setFilterStatus}
          />
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
              {visibleCrew.length === 0 ? (
                <tr><td colSpan="8" style={{ textAlign: 'center' }}>No crew found.</td></tr>
              ) : (
                visibleCrew.map((crew) => (
                  <tr key={crew.id}>
                    <td className="crew-id">{crew.crew_id ? String(crew.crew_id).padStart(4, '0') : ''}</td>
                    <td className="crew-fname">{crew.firstName}</td>
                    <td className="crew-lname">{crew.lastName}</td>
                    <td className="crew-email">{crew.email}</td>
                    <td className="crew-gender"><b>{crew.gender}</b></td>
                    <td className="crew-status"><b>{crew.status}</b></td>
                    <td className="crew-created"><b>{crew.createdAt && crew.createdAt.toDate ? crew.createdAt.toDate().toLocaleDateString() : ''}</b></td>
                    <td className="crew-actions">
                      <button className="crew-action-btn" onClick={() => { setSelectedCrew(crew); setEditModalOpen(true); }}><FaEdit /></button>
                      <button className="crew-action-btn" onClick={() => { setSelectedCrew(crew); setDeleteModalOpen(true); }}><FaTrash /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <CrewEditModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSave={handleAddCrew} />
        <EditCrewModal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} crew={selectedCrew} onSave={handleEditCrew} />
        <DeleteCrewModal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} onConfirm={handleArchiveCrew} crew={selectedCrew} />
      </main>
    </div>
  );
}

export default AdminCrew;
