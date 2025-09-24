import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FeedPage from './FeedPage';
import DashboardPage from './DashboardPage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import Navbar from '../components/Navbar';

export default function App() {
  const [user, setUser] = useState(null);
  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<FeedPage user={user} />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}
