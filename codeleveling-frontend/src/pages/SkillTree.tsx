import React from 'react';
import { motion } from 'framer-motion';

interface Skill {
  id: string;
  name: string;
  icon?: string;
  description: string;
  level?: number;
  maxLevel?: number;
  unlocked: boolean;
  prerequisites?: string[];
}

interface SkillTreeProps {
  skills: Skill[];
  hoveredSkill: Skill | null;
  setHoveredSkill: (skill: Skill | null) => void;
  onClose: () => void;
}

const SkillTree: React.FC<SkillTreeProps> = ({
    skills,
    hoveredSkill,
    setHoveredSkill,
    onClose
  }) => {
    const SkillNode = ({ skill }: { skill: Skill }) => {
      return (
        <motion.div
          className={`skill-node ${skill.unlocked ? 'unlocked' : 'locked'}`}
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{
            scale: skill.unlocked ? 1.15 : 0.9,
            opacity: skill.unlocked ? 1 : 0.5,
            boxShadow: skill.unlocked ? '0 0 15px #00ffffaa' : 'none'
          }}
          transition={{ duration: 0.5, type: 'spring' }}
          onMouseEnter={() => setHoveredSkill(skill)}
          onMouseLeave={() => setHoveredSkill(null)}
          style={{
            // You can add specific positioning here if required
          }}
        >
          <span className="skill-icon">{skill.icon}</span>
          <span className="skill-name">{skill.name}</span>
        </motion.div>
      );
    };

    return (
      <div className="skilltree-overlay" onClick={onClose}>
        <motion.div
          className="skilltree-modal"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.4 }}
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="skilltree-title">🌀 Skill Tree</h3>
          <div className="skilltree-grid">
            {skills.map((skill, index) => (
              <SkillNode key={index} skill={skill} />
            ))}
          </div>
          {hoveredSkill && (
            <div className="skill-tooltip">
              <strong>{hoveredSkill.name}</strong>
              <p>{hoveredSkill.description}</p>
            </div>
          )}
        </motion.div>
      </div>
    );
  };

export default SkillTree;
