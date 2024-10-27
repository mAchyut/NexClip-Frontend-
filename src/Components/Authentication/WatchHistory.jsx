import React, { useEffect, useState } from "react";
import authService from "../../backend/auth.js";
import VideoCard from "../CustomComponent/VideoCard.jsx";
import { useSelector } from "react-redux";

function WatchHistory() {
  const [watchHistory, setWatchHistory] = useState([]);
  const currentUser = useSelector((state) => state.auth?.status);
  const [refreshVideos, setRefreshVideos] = useState(false);

  const handleClearAllHistory = async () => {
    setRefreshVideos(false);
    const confirmation = window.confirm(
      "Are you sure you want to clear all your watch history?"
    );
    if (!confirmation) return;
    const response = await authService.removeWatchHistory();
    if (response) {
      setRefreshVideos(true);
    }
  };
  const handleClearHistoryVideo = async ({ videoId }) => {
    setRefreshVideos(false);
    if (!videoId) return;
    const response = await authService.removeWatchHistory(videoId);
    if (response) {
      setRefreshVideos(true);
    }
  };

  useEffect(() => {
    const fetchWatchHistory = async () => {
      try {
        const response = await authService.getWatchHistory();
        if (response?.data) {
          setWatchHistory(response.data);
        }
      } catch (error) {
        console.error("Error fetching watch history:", error);
      }
    };
    fetchWatchHistory();
  }, [refreshVideos, currentUser]);

  return (
    <div className="bg-gray-900 text-white p-6 mt-20 select-none">
      <h1 className="text-gray-400 text-3xl font-semibold mb-4">
        Watch History
      </h1>
      {watchHistory.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {watchHistory.map((video) => (
            <VideoCard
              key={video._id}
              title={video.title}
              channelName={video.owner?.username}
              avatar={video.owner?.avatar}
              thumbnail={video.thumbnail}
              duration={video.duration}
              views={video.views}
              _id={video._id}
              clearHistoryVideo={handleClearHistoryVideo}
              historyAccess={true}
            />
          ))}
          <button
            className="text-gray-400 hover:bg-gray-800 border border-gray-700 fixed top-20 right-8 z-10 p-2 rounded-xl hover:text-red-700"
            onClick={handleClearAllHistory}
          >
            Clear History ↻
          </button>
        </div>
      ) : (
        <div className="max-h-screen items-center flex justify-center">
          <p className="text-gray-400 transform translate-y-60">
            {currentUser
              ? "No watch history found."
              : "Login to get your watch history."}
          </p>
        </div>
      )}
    </div>
  );
}

export default WatchHistory;
