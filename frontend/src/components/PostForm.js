import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function PostForm({ user, onPost }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [media, setMedia] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  if (!user) return <div style={{ margin: '20px 0', color: '#aaa' }}>Login to post.</div>;
  const handleSubmit = async e => {
    e.preventDefault();
    if (media.length > 7) return setError('Max 7 files allowed.');
    setLoading(true);
    setError('');
    const form = new FormData();
    form.append('title', title);
    form.append('body', body);
    form.append('userId', user.id);
    for (let i = 0; i < media.length; ++i) form.append('media', media[i]);
    try {
      await axios.post('/posts', form, { headers: { 'Content-Type': 'multipart/form-data' } });
      setTitle(''); setBody(''); setMedia([]); setError('');
      onPost && onPost();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to post');
    }
    setLoading(false);
  };
  return (
    <motion.form onSubmit={handleSubmit} style={{ background: '#232526', borderRadius: 10, padding: 18, margin: '20px 0', boxShadow: '0 2px 8px #1112' }} initial={{ scale: 0.98 }} animate={{ scale: 1 }}>
      <h3>Create Post</h3>
      {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
      <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required style={{ width: '100%', margin: '8px 0' }} />
      <textarea placeholder="Body" value={body} onChange={e => setBody(e.target.value)} required style={{ width: '100%', margin: '8px 0', minHeight: 60 }} />
      <input type="file" multiple accept="image/*,video/*,audio/*" onChange={e => setMedia([...e.target.files])} style={{ margin: '8px 0' }} />
      <button type="submit" disabled={loading} style={{ width: '100%', margin: '8px 0' }}>{loading ? 'Posting...' : 'Post'}</button>
    </motion.form>
  );
}
