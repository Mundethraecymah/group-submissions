import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReportCard from './ReportCard';
import './dashboard.css';

const Dashboard = ({ user, reports }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Stats Logic
  const stats = {
    total: reports.length,
    pending: reports.filter(r => r.status === 'Pending').length,
    inProgress: reports.filter(r => r.status === 'In Progress').length,
    resolved: reports.filter(r => r.status === 'Resolved').length
  };

  // Filtering Logic
  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          report.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || report.status === statusFilter;
    const matchesCategory = categoryFilter === 'All' || report.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="dashboard-container">
      <header>
        <h1>Welcome back, {user?.username} 👋</h1>
        <button className="new-issue-btn" onClick={() => navigate('/submit-report')}>
          Report New Issue
        </button>
      </header>

      <div className="stat-pills">
  <div className="pill">Total Reports <span className="total">{stats.total}</span></div>
  <div className="pill">Pending <span className="orange">{stats.pending}</span></div>
  <div className="pill">In Progress <span className="blue">{stats.inProgress}</span></div>
  <div className="pill">Resolved <span className="green">{stats.resolved}</span></div>
</div>

      <div className="filters-section">
        <input 
          type="text" 
          placeholder="Search by title or location..." 
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>
        <select onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="All">All Categories</option>
          <option value="Road Damage">Road Damage</option>
          <option value="Waste Management">Waste Management</option>
          {/* Add other categories here */}
        </select>
      </div>

      <p className="results-count">Showing {filteredReports.length} reports</p>

      {filteredReports.length > 0 ? (
        <div className="reports-grid">
          {filteredReports.map(report => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          📬 <span>No results found.</span>
        </div>
      )}
    </div>
  );
};

export default Dashboard;