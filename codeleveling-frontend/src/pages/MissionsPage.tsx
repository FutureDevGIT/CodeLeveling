import { useEffect, useState } from 'react';
import MissionCard from '../components/MissionCard';

const MissionsPage = () => {
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/missions/')
      .then(res => res.json())
      .then(data => setMissions(data));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Daily Missions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {missions.map(mission => (
          <MissionCard key={mission.id} mission={mission} />
        ))}
      </div>
    </div>
  );
};

export default MissionsPage;
