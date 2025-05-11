import React, { useEffect } from 'react';
import './SoloLoader.css';

interface SoloLoaderProps {
  onFinish?: () => void;
}

const SoloLoader: React.FC<SoloLoaderProps> = ({ onFinish }) => {
  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      const fill = document.getElementById('progress');
      if (fill) {
        progress += Math.random() * 3;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          if (onFinish) onFinish();
          const text = document.getElementById('status-text');
          if (text) text.textContent = "HUNTER RANK UP COMPLETE!";
        }
        fill.style.width = `${progress}%`;
      }
    }, 200);
  }, [onFinish]);

  return (
    <div className="loader-backdrop">
      <div className="solo-loader">
        <div className="system-text">SYSTEM INITIALIZING...</div>
        <div className="progress-bar">
          <div className="progress-fill" id="progress"></div>
        </div>
        <div className="system-text" id="status-text">
          HUNTER RANK: [E] → [█]
        </div>
      </div>
    </div>
  );
};

export default SoloLoader;
