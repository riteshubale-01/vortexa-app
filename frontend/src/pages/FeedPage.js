import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { motion } from 'framer-motion';

export default function FeedPage({ user }) {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState('');
  useEffect(() => {
    fetchPosts();
    // WebSocket for live updates
    const ws = new window.WebSocket(process.env.REACT_APP_WS_URL || 'ws://localhost:5000');
    ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      if (data.type === 'new_post') fetchPosts();
    };
    return () => ws.close();
  }, []);
  const fetchPosts = async () => {
    const res = await axios.get(`/posts${filter ? `?sentiment=${filter}` : ''}`);
    setPosts(res.data);
  };
  return (
    <div style={{ maxWidth: 600, margin: '40px auto' }}>
      <PostForm user={user} onPost={fetchPosts} />
      <div style={{ margin: '20px 0' }}>
        <label>Filter by Sentiment: </label>
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="">All</option>
          <option value="Positive">Positive</option>
          <option value="Neutral">Neutral</option>
          <option value="Negative">Negative</option>
        </select>
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {posts.map(post => <PostCard key={post._id} post={post} />)}
      </motion.div>
    </div>
  );
}
