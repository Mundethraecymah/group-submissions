import React, { useState } from 'react';
import ReportCard from './ReportCard';
import './Admin.css';

const AdminPanel = ({ isAdmin, reports, onUpdateStatus, onDeleteReport }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState(null);

  // Requirement: Redirect if not admin
  if (!isAdmin) {
    window.location.href = '/dashboard';
    return null;
  }

  const handleDeleteClick = (id) => {
    setSelectedReportId(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    onDeleteReport(selectedReportId);
    setShowModal(false);
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Control Panel</h1>
        <span className="admin-badge">Administrator</span>
      </div>

      <div className="stat-cards">
        <div className="card green"><h3>Total</h3><p>{reports.length}</p></div>
        <div className="card yellow"><h3>Pending</h3><p>{reports.filter(r => r.status === 'Pending').length}</p></div>
        <div className="card blue"><h3>In Progress</h3><p>{reports.filter(r => r.status === 'In Progress').length}</p></div>
        <div className="card green"><h3>Resolved</h3><p>{reports.filter(r => r.status === 'Resolved').length}</p></div>
        <div className="card purple"><h3>Resolution Rate</h3><p>85%</p></div>
      </div>

      <div className="admin-reports-list">
        {reports.map(report => (
          <div key={report.id} className="admin-report-item">
            <ReportCard report={report} />
            <div className="admin-actions">
              <select 
                value={report.status} 
                onChange={(e) => onUpdateStatus(report.id, e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
              <button className="delete-btn" onClick={() => handleDeleteClick(report.id)}>
                🗑️ Delete Report
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Are you sure?</h3>
            <p>This action cannot be undone.</p>
            <div className="modal-buttons">
              <button className="confirm-btn" onClick={confirmDelete}>Yes, Delete</button>
              <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;