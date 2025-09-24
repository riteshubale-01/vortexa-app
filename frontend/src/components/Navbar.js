import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { motion } from 'framer-motion';

export default function Navbar({ user, setUser }) {
  return (
    <nav style={{ background: 'rgba(44,47,51,0.95)', padding: '10px 0', boxShadow: '0 2px 8px #1112' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 20 }}>
        <motion.img src={logo} alt="Vortexa" width={40} height={40} initial={{ rotate: 0 }} animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} />
        <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: 22 }}>Vortexa</Link>
        <Link to="/dashboard" style={{ color: '#fff', textDecoration: 'none', marginLeft: 20 }}>Dashboard</Link>
        <div style={{ flex: 1 }} />
        {user ? (
          <>
            <span style={{ color: '#fff' }}>Hi, {user.username}</span>
            <button onClick={() => { setUser(null); localStorage.removeItem('token'); window.location = '/'; }} style={{ marginLeft: 10 }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: '#fff', marginRight: 10 }}>Login</Link>
            <Link to="/register" style={{ color: '#fff' }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
