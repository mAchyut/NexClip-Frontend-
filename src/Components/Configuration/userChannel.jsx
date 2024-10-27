import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import authService from "../../backend/auth.js";
import { useSelector } from "react-redux";
import { videoService, subscriptionService } from "../../backend/config.js";
import VideoCard from "../CustomComponent/VideoCard.jsx";

function UserChannel() {
  const { username } = useParams(); // Assuming you're passing the username via URL params
  const [channelData, setChannelData] = useState(null);
  const currentUser = useSelector((state) => state.auth?.userData?.username);
  const [userVideos, setUserVideos] = useState([]);
  const [error, setError] = useState("");
  const [refreshVideos, setRefreshVideos] = useState(false);
  const [refreshUserChannel, setRefreshUserChannel] = useState(false);

  const isOwner = username === currentUser;

  useEffect(() => {
    const fetchChannelProfile = async () => {
      try {
        const response = await authService.getUserChannelProfile(username);
        setChannelData(response?.data);
      } catch (error) {
        console.error("Error fetching channel profile:", error);
        setError(error?.message);
      }
    };
    fetchChannelProfile();
  }, [username, refreshUserChannel]);

  const handleDelete = async (videoId) => {
    setRefreshVideos(false);
    if (!videoId) return;
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this video?"
    );
    if (!confirmDelete) return;
    try {
      const response = await videoService.deleteVideo(videoId);
      if (response) {
        setRefreshVideos(true);
      }
    } catch (error) {
      setError(error?.message);
    }
  };

  useEffect(() => {
    const getCurrentUserVideos = async () => {
      if (!channelData?._id) return;
      // console.log("CHANNEL DATA", channelData);
      const response = await videoService.getAllVideos({
        userId: channelData?._id,
      });
      if (response) {
        setUserVideos(response?.data?.videos);
      }
    };
    getCurrentUserVideos();
  }, [channelData, refreshVideos]);

  const togglePublish = async ({ videoId }) => {
    setRefreshVideos(false);
    try {
      if (!videoId) return;
      const publishStatus = await videoService.togglePublishStatus(videoId);
      if (publishStatus) {
        setRefreshVideos(true);
      }
    } catch (error) {
      console.error(error?.message);
    }
  };

  const toggleSubscription = async () => {
    setRefreshUserChannel(false);
    if (!channelData?._id) return; //owner is allowed as well
    const response = await subscriptionService.toggleSubscription({
      channelId: channelData?._id,
    });
    if (response) {
      setRefreshUserChannel(true);
    }
  };

  if (!channelData) {
    return (
      <div className="flex justify-center items-center w-full h-screen text-gray-300">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white p-6 transform translate-y-20 overflow-auto h-screen">
      {/* Cover Image */}
      <div className="relative h-64">
        <img
          src={channelData?.coverImage}
          alt="Cover"
          className="w-full h-full object-cover rounded-lg"
          draggable={false}
        />
      </div>

      {/* Avatar and Channel Info */}
      <div className="flex mt-4 items-center">
        <img
          src={channelData?.avatar}
          alt={`${channelData?.username}'s Avatar`}
          className="w-24 h-24 rounded-full border-4 border-gray-700"
          draggable={false}
        />
        <div className="ml-6">
          <span className="text-3xl font-bold">{channelData?.username}</span>
          {isOwner && (
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-500 via-amber-400 to-rose-500 select-none">
              {" ♕(Owner)♕"}
            </span>
          )}
          <p className="text-sm text-gray-400">
            Joined {new Date(channelData?.createdAt).toLocaleDateString()}
          </p>
          <div className="text-gray-300 text-sm mt-1">
            <p>{channelData?.subscribersCount} subscribers</p>
            <p>{channelData?.channelsSubscribedTo} subscribed-to</p>
          </div>
        </div>
      </div>

      {/* Subscribe Button */}
      <div className="flex justify-between">
        <div className="mt-4">
          {channelData?.isSubscribed ? (
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={toggleSubscription}
            >
              Subscribed
            </button>
          ) : (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={toggleSubscription}
            >
              Subscribe
            </button>
          )}
        </div>
        {isOwner && (
          <Link
            to={"/publish-video"}
            className="text-gray-300 right-20 mb-4 mr-4 border border-blue-800 hover:bg-gray-800 p-2 rounded-lg"
          >
            Publish video
          </Link>
        )}
      </div>
      <h1 className="mt-5 font-bold text-lg p-2">
        {isOwner ? "My Uploads" : " Uploads"}
      </h1>
      <hr className={isOwner ? "w-[10%]" : " w-[8%]"} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
        {userVideos?.length === 0 ? (
          isOwner ? (
            <h1 className="text-2xl font-bold">
              You haven't posted yet,{" "}
              <Link to="/publish-video" className="hover:text-gray-300">
                Publish?
              </Link>
            </h1>
          ) : (
            <h1 className="text-2xl font-bold user-select-none">
              This user has no posts!
            </h1>
          )
        ) : (
          userVideos.map((video) => (
            <VideoCard
              key={video?._id}
              avatar={video.owner?.avatar}
              channelName={video.owner?.username}
              {...video}
              isOwner={isOwner}
              onDelete={handleDelete}
              togglePublish={togglePublish}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default UserChannel;
