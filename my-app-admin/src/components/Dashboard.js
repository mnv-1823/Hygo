import React, { useState, useEffect } from 'react';
import { FaUsers, FaPills, FaBell, FaCheckCircle } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalMedications: 0,
    activeReminders: 0,
    completedReminders: 0
  });
  
  const [adherenceData, setAdherenceData] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    // Simulate fetching dashboard data
    setStats({
      totalUsers: 247,
      totalMedications: 893,
      activeReminders: 356,
      completedReminders: 1245
    });

    setAdherenceData([
      { name: 'Jan', adherence: 68 },
      { name: 'Feb', adherence: 72 },
      { name: 'Mar', adherence: 75 },
      { name: 'Apr', adherence: 79 },
      { name: 'May', adherence: 82 },
      { name: 'Jun', adherence: 80 },
      { name: 'Jul', adherence: 84 }
    ]);

    setRecentActivity([
      { id: 1, user: 'John Doe', action: 'Added new medication: Lisinopril', time: '10 minutes ago' },
      { id: 2, user: 'Sarah Smith', action: 'Updated dosage for Metformin', time: '35 minutes ago' },
      { id: 3, user: 'Mike Johnson', action: 'Marked reminder as complete', time: '1 hour ago' },
      { id: 4, user: 'Emily Wilson', action: 'Registered new account', time: '3 hours ago' },
      { id: 5, user: 'Robert Brown', action: 'Scheduled new reminder', time: '5 hours ago' }
    ]);
  }, []);

  return (
    <div className="dashboard">
      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon users">
            <FaUsers />
          </div>
          <div className="stat-details">
            <h3>Total Users</h3>
            <p className="stat-value">{stats.totalUsers}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon medications">
            <FaPills />
          </div>
          <div className="stat-details">
            <h3>Medications</h3>
            <p className="stat-value">{stats.totalMedications}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon reminders">
            <FaBell />
          </div>
          <div className="stat-details">
            <h3>Active Reminders</h3>
            <p className="stat-value">{stats.activeReminders}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon completed">
            <FaCheckCircle />
          </div>
          <div className="stat-details">
            <h3>Completed</h3>
            <p className="stat-value">{stats.completedReminders}</p>
          </div>
        </div>
      </div>

      <div className="dashboard-main">
        <div className="chart-container">
          <h2>Medication Adherence Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={adherenceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="adherence" stroke="#4CAF50" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="recent-activity">
          <h2>Recent Activity</h2>
          <ul className="activity-list">
            {recentActivity.map(activity => (
              <li key={activity.id} className="activity-item">
                <div className="activity-content">
                  <h4>{activity.user}</h4>
                  <p>{activity.action}</p>
                </div>
                <span className="activity-time">{activity.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;