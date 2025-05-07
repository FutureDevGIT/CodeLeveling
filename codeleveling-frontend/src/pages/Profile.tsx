import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import avatar from '/assets/hunter-avatar.png';
import SkillTree from './SkillTree';
import './SkillTree.css';

// Skill Interface
interface Skill {
  id: string;
  name: string;
  description: string;
  level: number;
  maxLevel: number;
  unlocked: boolean;
  prerequisites: string[];
}

// Initial Skills
const initialSkills: Skill[] = [
  { id: '1', name: "💻 HTML Basics", description: "Learn how to structure web pages using HTML5.", level: 1, maxLevel: 5, unlocked: true, prerequisites: [] },
  { id: '2', name: "🎨 CSS Styling", description: "Style your pages with colors, layouts, and animations.", level: 1, maxLevel: 5, unlocked: true, prerequisites: [] },
  { id: '3', name: "⚙ JavaScript", description: "Make your site dynamic with vanilla JS.", level: 1, maxLevel: 5, unlocked: true, prerequisites: [] },
  { id: '4', name: "🧠 React Fundamentals", description: "Build powerful UIs with components and state.", level: 1, maxLevel: 5, unlocked: false, prerequisites: ['3'] },
  { id: '5', name: "🌌 Backend with Django", description: "Create powerful APIs and server-side apps.", level: 1, maxLevel: 5, unlocked: false, prerequisites: ['3'] },
  { id: '6', name: "🧪 Machine Learning", description: "Train models to predict and recommend.", level: 1, maxLevel: 5, unlocked: false, prerequisites: ['4'] },
  { id: '7', name: "💼 Projects Mastery", description: "Build and deploy full-stack apps to showcase skills.", level: 1, maxLevel: 5, unlocked: false, prerequisites: ['6'] },
];

// User Interface
interface User {
  username: string;
  email: string;
  xp: number;
  level: number;
  rank: string;
  streak: number;
  last_active: string;
  last_mission_check: string;
  weekly_xp: number;
}

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [showSkillTree, setShowSkillTree] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);

  const stats = useMemo(() => [
    ["🗡 Strength", 95],
    ["🧠 Intelligence", 82],
    ["⚡ Agility", 88],
    ["❤️ Vitality", 76],
    ["🔮 Mana", 93],
    ["🎯 Perception", 80]
  ], []);

  const inventoryItems = useMemo(() => [
    ["vscode", "VS Code"],
    ["Git", "GitHub"],
    ["stackoverflow", "Stack Overflow"],
    ["python", "Python"],
    ["Bash", "Bash"],
    ["Canva", "Canva"]
  ], []);

  const handleSkillTreeToggle = () => {
    setShowSkillTree((prev) => !prev);
  };

  // Fetch user info
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) return navigate('/login');

    fetch('http://localhost:8000/api/auth/me/', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('Unauthorized');
        return res.json();
      })
      .then(data => {
        setUser({
          username: data.username,
          email: data.email,
          xp: data.xp || 0,
          level: data.level || 1,
          rank: data.rank || 'E-Rank',
          streak: data.streak || 0,
          last_active: data.last_active || '',
          last_mission_check: data.last_mission_check || '',
          weekly_xp: data.weekly_xp || 0,
        });
      })
      .catch(() => navigate('/login'));
  }, [navigate]);

  if (!user) return <div className="profile-container"><div className="auth-box">Loading...</div></div>;

  const xpPercent = Math.min((user.xp % 10000) / 100, 100);

  return (
    <div className="profile-container">
      {/* Header */}
      <div className="profile-header">
        <img src={avatar} alt="Hunter Avatar" className="profile-avatar" />
        <div className="profile-user-info">
          <h2 className="profile-username">{user.username}</h2>
          <p className="profile-rank">{user.rank}</p>
        </div>
      </div>

      {/* XP Bar */}
      <div className="xp-bar">
        <div className="xp-fill" style={{ width: `${xpPercent}%` }} />
        <span className="xp-text">Level {user.level} - {user.xp} / 10000 XP</span>
      </div>

      {/* Additional Profile Stats */}
      <div className="profile-metrics">
        <div className="profile-stats">
          <div className="profile-stat">
            <h4>🔥 Daily Streak</h4>
            <span>{user.streak} days</span>
          </div>
          <div className="profile-stat">
            <h4>📅 Last Active</h4>
            <span>{new Date(user.last_active).toLocaleDateString()}</span>
          </div>
          <div className="profile-stat">
            <h4>🧾 Last Mission Check</h4>
            <span>{new Date(user.last_mission_check).toLocaleDateString()}</span>
          </div>
          <div className="profile-stat">
            <h4>📈 Weekly XP</h4>
            <span>{user.weekly_xp}</span>
          </div>
        </div>
      </div>

      {/* Skill Tree Toggle */}
      <button className="system-button" onClick={handleSkillTreeToggle}>
        🌀 Open Skill Tree
      </button>

      {/* Stats */}
      <div className="stats-grid">
        {stats.map(([label, value]) => (
          <div className="stat-box" key={label}>
            {label} <span>{value}</span>
          </div>
        ))}
      </div>

      {/* Inventory */}
      <div className="inventory-section">
        <h3 className="inventory-title">Inventory</h3>
        <div className="inventory-grid">
          {inventoryItems.map(([key, name]) => (
            <div className="inventory-item" key={key}>
              <img src={`/assets/tools/${key}.png`} alt={name} />
              <span>{name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Skill Tree Modal */}
      {showSkillTree && (
        <SkillTree
          skills={initialSkills}
          hoveredSkill={hoveredSkill}
          setHoveredSkill={setHoveredSkill}
          onClose={handleSkillTreeToggle}
        />
      )}
    </div>
  );
};

export default ProfilePage;
