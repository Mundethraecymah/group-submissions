import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './component/dashboard/Dashboard';
import AdminPanel from './component/dashboard/AdminPanel';
import SubmitReport from './component/dashboard/SubmitReport';
import './App.css';

function App() {
  // 1. Initial Data
  const [reports, setReports] = useState([
    {
      id: 1,
      title: "Broken Street Light",
      location: "Main Street, Bamenda",
      category: "Electricity Outage",
      status: "Pending",
      description: "The light has been flickering for three days.",
      date: "2024-03-18"
    }
  ]);

  const [user] = useState({ username: "Robert", isAdmin: true });

  // --- THE EDITS START HERE ---

  // 2. Add this function to handle NEW reports from the user
  const handleAddReport = (newReport) => {
    // This adds the new report to the top of the list
    setReports([newReport, ...reports]);
  };

  // 3. Status Update Logic (The "Approval" process)
  const updateStatus = (id, newStatus) => {
    setReports(reports.map(r => r.id === id ? { ...r, status: newStatus } : r));
  };

  const deleteReport = (id) => {
    setReports(reports.filter(r => r.id !== id));
  };

  return (
    <Router>
      <nav className="navbar">
        <Link to="/">Dashboard</Link>
        <Link to="/admin">Admin Panel</Link>
      </nav>

      <Routes>
        {/* Pass the handleAddReport function to the Submit page */}
        <Route 
          path="/submit-report" 
          element={<SubmitReport onAddReport={handleAddReport} />} 
        />
        
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