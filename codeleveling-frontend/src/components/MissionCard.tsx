const MissionCard = ({ mission }) => {
    return (
      <div className="p-4 shadow-lg rounded-xl border hover:shadow-xl transition">
        <h3 className="text-lg font-semibold">{mission.name}</h3>
        <p className="text-sm text-gray-500">{mission.description}</p>
        <button className="mt-2 px-4 py-1 bg-blue-600 text-white rounded-md">
          Start Mission
        </button>
      </div>
    );
  };

  export default MissionCard;
