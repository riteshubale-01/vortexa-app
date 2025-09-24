import React, { useState } from 'react';
import axios from 'axios';

export default function LoginPage({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/users/login', { email, password });
      setUser(res.data.user);
      localStorage.setItem('token', res.data.token);
      window.location = '/';
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };
  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 320, margin: '60px auto' }}>
      <h2>Login</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', margin: '8px 0' }} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', margin: '8px 0' }} />
      <button type="submit" style={{ width: '100%', margin: '8px 0' }}>Login</button>
    </form>
  );
}
