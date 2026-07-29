
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import SubmitReport from './pages/SubmitReport';
import AdminPanel from './pages/AdminPanel';
import NoticeBoardPage from './pages/NoticeBoardPage';
import MembersPage from './pages/MembersPage';
import ProfilePage from './pages/ProfilePage';
import PricingPage from './pages/PricingPage';
import AboutPage from './pages/AboutPage';
import './App.css';

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function AdminRoute({ children }) {
  const { user } = useAuth();
  return user && user.role === 'admin' ? children : <Navigate to="/dashboard" />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/notice-board" element={<NoticeBoardPage />} />
          <Route path="/members" element={<MembersPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/dashboard" element={
            <PrivateRoute><Dashboard /></PrivateRoute>
          } />
          <Route path="/submit-report" element={
            <PrivateRoute><SubmitReport /></PrivateRoute>
          } />
          <Route path="/admin" element={
            <AdminRoute><AdminPanel /></AdminRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;