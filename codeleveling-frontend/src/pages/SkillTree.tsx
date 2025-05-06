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
  category?: string;
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
  onClose
}) => {
  const [hoveredSkillId, setHoveredSkillId] = React.useState<string | null>(null);

  // Group skills by category for better organization
  const skillCategories = skills.reduce((acc, skill) => {
    const category = skill.category || 'General';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const SkillNode = ({ skill }: { skill: Skill }) => {
    return (
      <motion.div
        className={`skill-node ${skill.unlocked ? 'unlocked' : 'locked'}`}
        onMouseEnter={() => setHoveredSkillId(skill.id)}
        onMouseLeave={() => setHoveredSkillId(null)}
      >
        <div className="skill-icon-wrapper">
          {skill.icon ? (
            <img src={skill.icon} alt={skill.name} className="skill-icon" />
          ) : (
            <div className="skill-icon-placeholder">{skill.name.charAt(0)}</div>
          )}
        </div>
        <span className="skill-name">{skill.name}</span>
        {skill.level && (
          <div className="skill-level">
            <div
              className="level-bar"
              style={{ width: `${(skill.level / (skill.maxLevel || 5)) * 100}%` }}
            ></div>
            <span>Lv. {skill.level}</span>
          </div>
        )}
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
        <div className="skilltree-header">
          <h3 className="skilltree-title">SHADOW MONARCH SKILL TREE</h3>
          <button className="close-button" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="skilltree-content">
          {Object.entries(skillCategories).map(([category, categorySkills]) => (
            <div key={category} className="skill-category">
              <h4 className="category-title">{category.toUpperCase()}</h4>
              <div className="skilltree-grid">
                {categorySkills.map((skill) => (
                  <SkillNode key={skill.id} skill={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {hoveredSkill && (
          <div className="skill-tooltip">
            <div className="tooltip-header">
              <strong>{hoveredSkill.name}</strong>
              {hoveredSkill.level && (
                <span className="tooltip-level">Lv. {hoveredSkill.level}/{hoveredSkill.maxLevel}</span>
              )}
            </div>
            <p className="tooltip-description">{hoveredSkill.description}</p>
            {hoveredSkill.prerequisites && hoveredSkill.prerequisites.length > 0 && (
              <div className="tooltip-prerequisites">
                <span>Requires:</span>
                <ul>
                  {hoveredSkill.prerequisites.map((prereq) => (
                    <li key={prereq}>{prereq}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default SkillTree;