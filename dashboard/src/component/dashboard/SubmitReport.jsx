import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SubmitReport.css';

const SubmitReport = ({ onAddReport }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    category: 'Road Damage',
    description: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReport = {
      ...formData,
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      status: 'Pending' // All new reports start as Pending for Admin review
    };
    
    onAddReport(newReport);
    alert("Report sent to Admin for review!");
    navigate('/dashboard');
  };

  return (
    <div className="submit-container">
      <div className="submit-card">
        <h2>Report a New Issue</h2>
        <p>Provide details about the infrastructure problem below.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Issue Title</label>
            <input 
              type="text" 
              required 
              placeholder="e.g. Large Pothole" 
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label>Location</label>
            <input 
              type="text" 
              required 
              placeholder="e.g. Commercial Avenue, Bamenda" 
              onChange={(e) => setFormData({...formData, location: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select onChange={(e) => setFormData({...formData, category: e.target.value})}>
              <option value="Road Damage">Road Damage</option>
              <option value="Waste Management">Waste Management</option>
              <option value="Water Issue">Water Issue</option>
              <option value="Street Lighting">Street Lighting</option>
            </select>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea 
              required 
              rows="4" 
              placeholder="Describe the issue in detail..."
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            ></textarea>
          </div>

          <button type="submit" className="send-btn">Send Report</button>
        </form>
      </div>
    </div>
  );
};

export default SubmitReport;