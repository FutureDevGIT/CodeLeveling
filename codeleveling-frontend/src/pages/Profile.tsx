import React, { useState, useMemo } from 'react';
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

const initialSkills: Skill[] = [
  { id: '1', name: "💻 HTML Basics", description: "Learn how to structure web pages using HTML5.", level: 1, maxLevel: 5, unlocked: true, prerequisites: [] },
  { id: '2', name: "🎨 CSS Styling", description: "Style your pages with colors, layouts, and animations.", level: 1, maxLevel: 5, unlocked: true, prerequisites: [] },
  { id: '3', name: "⚙ JavaScript", description: "Make your site dynamic with vanilla JS.", level: 1, maxLevel: 5, unlocked: true, prerequisites: [] },
  { id: '4', name: "🧠 React Fundamentals", description: "Build powerful UIs with components and state.", level: 1, maxLevel: 5, unlocked: false, prerequisites: ['3'] },
  { id: '5', name: "🌌 Backend with Django", description: "Create powerful APIs and server-side apps.", level: 1, maxLevel: 5, unlocked: false, prerequisites: ['3'] },
  { id: '6', name: "🧪 Machine Learning", description: "Train models to predict and recommend.", level: 1, maxLevel: 5, unlocked: false, prerequisites: ['4'] },
  { id: '7', name: "💼 Projects Mastery", description: "Build and deploy full-stack apps to showcase skills.", level: 1, maxLevel: 5, unlocked: false, prerequisites: ['6'] },
];

// ProfilePage Component
const ProfilePage: React.FC = () => {
  const [showSkillTree, setShowSkillTree] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);

  const handleSkillTreeToggle = () => {
    setShowSkillTree((prev) => !prev);
  };

  // Memoized data to avoid unnecessary rerenders
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
    ["Canva", "Canva"],
    // Add other items as needed
  ], []);

  return (
    <div className="profile-container">
      {/* Header */}
      <div className="profile-header">
        <img src={avatar} alt="Hunter Avatar" className="profile-avatar" />
        <h2 className="profile-username">Sung Jin-Woo</h2>
        <p className="profile-rank">Shadow Monarch</p>
      </div>

      {/* XP Bar */}
      <div className="xp-bar">
        <div className="xp-fill" style={{ width: '68%' }} />
        <span className="xp-text">Level 34 - 6800 / 10000 XP</span>
      </div>

      {/* Skill Tree Button */}
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
