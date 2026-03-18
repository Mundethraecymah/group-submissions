import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './component/dashboard/Dashboard';

import './App.css';
import AdminPanel from './component/dashboard/AdminPanel';

function App() {
  // 1. THIS IS THE DATA! Without this, the page is blank.
  const [reports, setReports] = useState([
    {
      id: 1,
      title: "Broken Street Light",
      location: "Main Street, Bamenda",
      category: "Electricity Outage",
      status: "Pending",
      description: "The light has been flickering for three days.",
      date: "2024-03-18"
    },
    {
      id: 2,
      title: "Large Pothole",
      location: "Commercial Avenue",
      category: "Road Damage",
      status: "In Progress",
      description: "Dangerous pothole near the junction.",
      date: "2024-03-17"
    }
  ]);

  // 2. State to simulate a logged-in user
  const [user] = useState({ username: "Robert", isAdmin: true });

  // 3. Functions to update data
  const updateStatus = (id, newStatus) => {
    setReports(reports.map(r => r.id === id ? { ...r, status: newStatus } : r));
  };

  const deleteReport = (id) => {
    setReports(reports.filter(r => r.id !== id));
  };

  return (
    <Router>
      <nav style={{ padding: '10px', background: '#333', color: '#fff' }}>
        <Link to="/" style={{ color: '#fff', marginRight: '15px' }}>Dashboard</Link>
        <Link to="/admin" style={{ color: '#fff' }}>Admin Panel</Link>
      </nav>

      <Routes>
        <Route 
          path="/" 
          element={<Dashboard user={user} reports={reports} />} 
        />
        <Route 
          path="/admin" 
          element={
            <AdminPanel 
              isAdmin={user.isAdmin} 
              reports={reports} 
              onUpdateStatus={updateStatus} 
              onDeleteReport={deleteReport} 
            />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;