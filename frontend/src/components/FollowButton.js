import React, { useState } from 'react';
import axios from 'axios';

export default function FollowButton({ userId, targetId, isFollowing, onChange }) {
  const [loading, setLoading] = useState(false);
  const handleFollow = async () => {
    setLoading(true);
    await axios.post(isFollowing ? '/follow/unfollow' : '/follow/follow', { userId, targetId });
    setLoading(false);
    onChange && onChange();
  };
  return (
    <button onClick={handleFollow} disabled={loading} style={{ marginLeft: 8 }}>
      {loading ? '...' : isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  );
}
