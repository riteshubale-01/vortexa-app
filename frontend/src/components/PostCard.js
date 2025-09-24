import React from 'react';
import { motion } from 'framer-motion';

const SENTIMENT_COLORS = {
  Positive: '#4caf50',
  Neutral: '#ffeb3b',
  Negative: '#f44336'
};

export default function PostCard({ post }) {
  return (
    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4 }} style={{ background: '#292b2f', borderRadius: 10, margin: '16px 0', padding: 18, boxShadow: '0 2px 8px #1112' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontWeight: 700 }}>{post.user?.username || 'Unknown'}</span>
        {post.isAIDailyNews && <span style={{ background: '#5C6BC0', color: '#fff', borderRadius: 4, padding: '2px 6px', fontSize: 12 }}>AI Daily News</span>}
        <span style={{ color: '#aaa', fontSize: 12, marginLeft: 8 }}>{new Date(post.timestamp).toLocaleString()}</span>
        <span style={{ background: SENTIMENT_COLORS[post.sentiment_label], color: '#222', borderRadius: 4, padding: '2px 8px', fontWeight: 600, marginLeft: 8 }}>{post.sentiment_label}</span>
        <span style={{ color: '#888', fontSize: 12, marginLeft: 8 }}>({(post.confidence * 100).toFixed(0)}%)</span>
      </div>
      <h3 style={{ margin: '10px 0 4px 0' }}>{post.title}</h3>
      <div style={{ marginBottom: 8 }}>{post.body}</div>
      {post.media_urls && post.media_urls.length > 0 && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: '8px 0' }}>
          {post.media_urls.map((url, idx) => {
            if (url.match(/\.(jpg|jpeg|png|gif)$/i)) return <img key={idx} src={url} alt="media" style={{ maxWidth: 120, borderRadius: 6 }} />;
            if (url.match(/\.(mp4|webm)$/i)) return <video key={idx} src={url} controls style={{ maxWidth: 180, borderRadius: 6 }} />;
            if (url.match(/\.(mp3|wav)$/i)) return <audio key={idx} src={url} controls style={{ maxWidth: 180 }} />;
            return null;
          })}
        </div>
      )}
      <div style={{ color: '#aaa', fontSize: 13, marginTop: 6 }}>AI: {post.explanation}</div>
    </motion.div>
  );
}
