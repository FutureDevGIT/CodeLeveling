import React from 'react';
import { Link } from 'react-router-dom';

const Signup: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-gray-900 via-black to-gray-950 text-white">
      <div className="bg-gray-800 p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Join the Guild</h2>
        <form className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="p-3 rounded-md bg-gray-700 placeholder-gray-400 text-white"
          />
          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded-md bg-gray-700 placeholder-gray-400 text-white"
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded-md bg-gray-700 placeholder-gray-400 text-white"
          />
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 py-3 rounded-md font-semibold"
          >
            Awaken Now
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Already awakened? <Link to="/login" className="text-blue-400 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
