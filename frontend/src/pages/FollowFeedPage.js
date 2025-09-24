import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from '../components/PostCard';

export default function FollowFeedPage({ user }) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (!user) return;
    fetchFollowedPosts();
  }, [user]);
  const fetchFollowedPosts = async () => {
    // Fetch posts from followed users
    const res = await axios.get(`/posts?followedBy=${user.id}`);
    setPosts(res.data);
  };
  if (!user) return <div style={{ margin: '40px auto', color: '#aaa' }}>Login to see your followed feed.</div>;
  return (
    <div style={{ maxWidth: 600, margin: '40px auto' }}>
      <h3>Followed Users' Posts</h3>
      {posts.map(post => <PostCard key={post._id} post={post} />)}
    </div>
  );
}
