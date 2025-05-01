import { useEffect, useState } from 'react';

interface Mission {
  id: number;
  name: string;
}

function Missions() {
  const [missions, setMissions] = useState<Mission[]>([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/missions/')
      .then(response => response.json())
      .then(data => setMissions(data));
  }, []);

  return (
    <div>
      <h1>Missions</h1>
      <ul>
        {missions.map(mission => (
          <li key={mission.id}>{mission.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Missions;
