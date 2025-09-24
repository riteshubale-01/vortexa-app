import React, { useState } from 'react';
import axios from 'axios';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('/users/register', { username, email, password });
      setSuccess('Registered! Please login.');
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
      setSuccess('');
    }
  };
  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 320, margin: '60px auto' }}>
      <h2>Register</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}
      <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required style={{ width: '100%', margin: '8px 0' }} />
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', margin: '8px 0' }} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', margin: '8px 0' }} />
      <button type="submit" style={{ width: '100%', margin: '8px 0' }}>Register</button>
    </form>
  );
}
