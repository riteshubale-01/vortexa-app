import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const COLORS = ['#4caf50', '#ffeb3b', '#f44336'];
const SENTIMENTS = ['Positive', 'Neutral', 'Negative'];

export default function DashboardPage() {
  const [data, setData] = useState({ timeBuckets: {}, dist: {}, topKeywords: {} });
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);
  const fetchData = async () => {
    const res = await axios.get('/dashboard');
    setData(res.data);
  };
  // Prepare chart data
  const pieData = SENTIMENTS.map(s => ({ name: s, value: data.dist[s] || 0 }));
  const lineData = Object.keys(data.timeBuckets).map(hour => ({
    hour,
    ...data.timeBuckets[hour]
  }));
  return (
    <div style={{ maxWidth: 800, margin: '40px auto' }}>
      <h2>Sentiment Dashboard</h2>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={lineData}>
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Positive" stroke="#4caf50" />
            <Line type="monotone" dataKey="Neutral" stroke="#ffeb3b" />
            <Line type="monotone" dataKey="Negative" stroke="#f44336" />
          </LineChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
              {pieData.map((entry, idx) => <Cell key={entry.name} fill={COLORS[idx]} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div style={{ marginTop: 30 }}>
          <h4>Top Keywords per Sentiment</h4>
          <div style={{ display: 'flex', gap: 30 }}>
            {SENTIMENTS.map(s => (
              <div key={s}>
                <b style={{ color: COLORS[SENTIMENTS.indexOf(s)] }}>{s}:</b>
                <ul>
                  {(data.topKeywords[s] || []).map(w => <li key={w}>{w}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
