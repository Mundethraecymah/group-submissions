import React from 'react';
import './ReportCard.css';

const ReportCard = ({ report, isAdmin, onUpdateStatus, onDelete }) => {
  // Logic to handle color classes for the status tags
  const getStatusClass = (status) => {
    return status.toLowerCase().replace(/\s+/g, '-');
  };

  return (
    <div className="report-card">
      <div className="card-header">
        <span className={`status-tag ${getStatusClass(report.status)}`}>
          {report.status}
        </span>
        <span className="report-date">{report.date}</span>
      </div>

      <div className="card-content">
        <h3 className="report-title">{report.title}</h3>
        <p className="report-location">📍 {report.location}</p>
        <p className="report-category"><strong>Category:</strong> {report.category}</p>
        <p className="report-description">{report.description}</p>
      </div>

      {/* Admin specific controls - Only shows if isAdmin prop is true */}
      {isAdmin && (
        <div className="admin-controls">
          <select 
            value={report.status} 
            onChange={(e) => onUpdateStatus(report.id, e.target.value)}
            className="status-select"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
          
          <button 
            className="delete-btn" 
            onClick={() => onDelete(report.id)}
          >
            🗑️ Delete Report
          </button>
        </div>
      )}
    </div>
  );
};

export default ReportCard;