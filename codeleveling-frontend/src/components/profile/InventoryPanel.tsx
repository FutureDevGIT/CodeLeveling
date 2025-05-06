// src/components/profile/InventoryPanel.tsx
import React from 'react';
import './InventoryPanel.css';

const inventoryItems = [
  {
    id: 1,
    name: 'VS Code',
    icon: '/assets/tools/vscode.png',
    description: 'A powerful code editor. Boosts coding speed +15%',
  },
  {
    id: 2,
    name: 'GitHub Badge',
    icon: '/assets/tools/github.png',
    description: 'Badge of collaboration. Enables team synergy.',
  },
  {
    id: 3,
    name: 'Stack Overflow Scroll',
    icon: '/assets/tools/stackoverflow.png',
    description: 'Ancient scroll of solutions. Intelligence +10.',
  },
];

const InventoryPanel: React.FC = () => {
  return (
    <div className="inventory-panel">
      <h2>Inventory</h2>
      <div className="inventory-grid">
        {inventoryItems.map((item) => (
          <div key={item.id} className="inventory-item">
            <img src={item.icon} alt={item.name} />
            <div className="item-details">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryPanel;
