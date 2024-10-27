import React, { useEffect, useState } from "react";
import authService from "../../backend/auth.js";
import {
  FaThumbsUp,
  FaUser,
  FaEye,
  FaMeteor,
  FaFantasyFlightGames,
  FaTv,
} from "react-icons/fa"; // Icons for stats

function Dashboard() {
  const [dashboardStats, setDashboardStats] = useState({});

  useEffect(() => {
    const dashboard = async () => {
      try {
        const stats = await authService.getChannelStats();
        if (stats) {
          setDashboardStats(stats?.data);
          console.log(stats);
        }
      } catch (error) {
        console.log(error?.message);
      }
    };
    dashboard();
  }, []);

  return (
    <div className="max-h-screen bg-gray-900 p-6 text-white mt-16 select-none">
      <h1 className="text-4xl font-semibold text-gray-400 mb-8 text-center relative">
        My Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Likes */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition-all ease-in-out duration-300 hover:scale-105">
          <div className="flex items-center justify-between">
            <FaThumbsUp className="text-blue-500 text-3xl" />
            <div className="text-5xl font-bold">
              {dashboardStats?.likesCount >= 1000
                ? (dashboardStats?.likesCount / 1000).toFixed(1) + "k"
                : dashboardStats?.likesCount || 0}
            </div>
          </div>
          <p className="text-gray-400 mt-4">Total Likes</p>
        </div>

        {/* Subscribers */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition-all ease-in-out duration-300 hover:scale-105">
          <div className="flex items-center justify-between">
            <FaUser className="text-green-500 text-3xl" />
            <div className="text-5xl font-bold">
              {dashboardStats?.subscribersCount >= 1000
                ? (dashboardStats?.subscribersCount / 1000).toFixed(1) + "k"
                : dashboardStats?.subscribersCount || 0}
            </div>
          </div>
          <p className="text-gray-400 mt-4">Total Subscribers</p>
        </div>

        {/* Views */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition-all ease-in-out duration-300 hover:scale-105">
          <div className="flex items-center justify-between">
            <FaEye className="text-yellow-500 text-3xl" />
            <div className="text-5xl font-bold">
              {dashboardStats?.viewsCount >= 1000
                ? (dashboardStats?.viewsCount / 1000).toFixed(1) + "k"
                : dashboardStats?.viewsCount || 0}
            </div>
          </div>
          <p className="text-gray-400 mt-4">Total Views</p>
        </div>
      </div>

      {/* Horizontal Separator */}
      <div className="border-t border-gray-600 my-8"></div>

      {/* Additional Information or Future Dashboard Features */}
      <div className="text-gray-400 text-center text-lg">
        <p>Explore more features and analytics coming soon!</p>
      </div>
    </div>
  );
}

export default Dashboard;
