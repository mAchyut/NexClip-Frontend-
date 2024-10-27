import React, { useEffect, useState } from "react";
import { subscriptionService, videoService } from "../../backend/config.js";
import { Link, useNavigate, useParams } from "react-router-dom";
import authService from "../../backend/auth.js";
import { FaRegThumbsUp, FaThumbsUp, FaShare } from "react-icons/fa";
import { ShareMenu, Comments } from "../CustomComponent/custom.js";
import { useSelector } from "react-redux";

function PlayVideo() {
  const { videoId } = useParams();
  const [videoURL, setVideoURL] = useState("");
  const [isHistoryAdded, setIsHistoryAdded] = useState(false);
  const [isVideoViewed, setIsVideoViewed] = useState(false);
  const [videoLikes, setVideoLikes] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [likeRefresh, setLikeRefresh] = useState(false);
  const [isVideoLiked, setIsVideoLiked] = useState(false);
  const [videoDetails, setVideoDetails] = useState("");
  const [channelData, setChannelData] = useState(null);
  const currentUser = useSelector((state) => state.auth?.status);
  const navigate = useNavigate();

  //word wrap
  const description = videoDetails?.description || "";
  const maxLength = 160; // Define a limit for truncation

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };
  // Fetch video by ID(no-authorization)
  useEffect(() => {
    if (videoId) {
      const fetchVideo = async () => {
        try {
          const video = await videoService.getVideoById(videoId);
          if (video?.data?.videoFile) {
            setVideoURL(video.data.videoFile);
            setVideoDetails(video?.data);
          }
        } catch (error) {
          console.error("Error fetching video:", error);
        }
      };
      fetchVideo();
    }
  }, [videoId]);

  // Add video to watch history once
  useEffect(() => {
    const addToWatchHistory = async () => {
      try {
        if (videoId && !isHistoryAdded) {
          await authService.addWatchHistory(videoId);
          setIsHistoryAdded(true);
        }
      } catch (error) {
        console.error("Error adding to watch history:", error);
      }
    };
    addToWatchHistory();
  }, [videoId, isHistoryAdded]);

  const handleViews = async () => {
    if (!isVideoViewed && videoId) {
      await videoService.addViews(videoId);
      setIsVideoViewed(true);
    }
  };

  // Like the video
  const toggleLike = async () => {
    if (!currentUser) {
      navigate("/login");
    }
    setLikeRefresh(false);
    if (!videoId || !videoURL) return;
    const likeResponse = await videoService.toggleVideoLike(videoId);
    if (likeResponse) {
      setLikeRefresh(true);
    }
  };

  // Fetch likes and if the user liked it
  useEffect(() => {
    const getVideoLikes = async () => {
      if (!videoId || !videoURL) return;
      const likes = await videoService.getVideoLikes(videoId);
      if (likes) {
        setVideoLikes(likes?.data?.totalLikes);
        setIsVideoLiked(likes?.data?.isLiked);
      }
    };
    getVideoLikes();
  }, [videoId, videoURL, likeRefresh]);

  const toggleSubscription = async () => {
    if (!currentUser) {
      navigate("/login");
    }
    setRefresh(false);
    if (!videoId || !videoURL) return;
    const response = await subscriptionService.toggleSubscription({
      channelId: videoDetails?.owner?._id,
    });
    if (response) {
      setRefresh(true);
    }
  };

  // requires user to be logged in to know isSubscribed
  useEffect(() => {
    const fetchChannelProfile = async () => {
      if (!videoDetails?.owner) return;
      try {
        const response = await authService.getUserChannelProfile(
          videoDetails?.owner?.username
        );
        setChannelData(response?.data);
        console.log("GET PROFILE", response);
      } catch (error) {
        console.error("Error fetching channel profile:", error);
      }
    };
    fetchChannelProfile();
  }, [videoDetails, refresh]);

  return (
    <div className="overflow-y-auto flex flex-col lg:flex-row justify-between items-start bg-gray-900 text-white p-4 min-h-screen absolute top-2 mt-16 overflow-x-hidden max-w-full">
      <div className="flex flex-col w-full lg:w-3/4 space-y-4">
        {/* Video Player */}
        {videoURL && (
          <video
            src={videoURL}
            controls
            controlsList="nodownload"
            className="w-full rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
            onPlay={handleViews}
            // autoPlay
            onLoadedMetadata={(e) => {
              e.target.volume = 0.2; // Set volume to 20%
            }}
          ></video>
        )}
        {/* Video Information Section */}
        {currentUser ? (
          <div className="p-4 bg-gray-900 rounded-lg space-y-2 transition-all shadow-2xl">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <Link to={`/channel/${channelData?.username}`}>
                  <img
                    src={channelData?.avatar}
                    alt={`${channelData?.username}'s Avatar`}
                    className="w-12 h-12 rounded-full border-4 border-gray-700"
                    draggable={false}
                  />
                </Link>
                <div>
                  <Link
                    className="text-xl font-semibold"
                    to={`/channel/${channelData?.username}`}
                  >
                    {channelData?.username}
                  </Link>
                  <p className="text-gray-400">
                    {channelData?.subscribersCount >= 1000
                      ? (channelData?.subscribersCount / 1000).toFixed(1) + "k"
                      : channelData?.subscribersCount || 0}{" "}
                    subscribers
                  </p>
                </div>
                <button
                  onClick={toggleSubscription}
                  className={`ml-4 px-4 py-2 rounded transition ${
                    channelData?.isSubscribed
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  {channelData?.isSubscribed ? "Subscribed" : "Subscribe"}
                </button>
              </div>
              <div className="flex space-x-0">
                <button
                  onClick={toggleLike}
                  className="flex items-center border border-gray-700 hover:bg-gray-800 p-2 rounded-l-full text-white transition-all duration-300"
                >
                  {isVideoLiked ? (
                    <FaThumbsUp className="mr-2" />
                  ) : (
                    <FaRegThumbsUp className="mr-2" />
                  )}
                  {videoLikes >= 1000
                    ? (videoLikes / 1000).toFixed(1) + "k"
                    : videoLikes || 0}
                </button>
                <ShareMenu videoId={videoId} />
              </div>
            </div>

            {description && (
              <p
                className="text-gray-400 p-2 rounded-lg overflow-y-hidden absolute h-auto"
                style={{
                  wordWrap: "break-word",
                  maxWidth: "70%",
                  whiteSpace: "normal", // Allow normal wrapping of the text
                  overflowWrap: "break-word",
                  wordBreak: "break-word",
                }}
              >
                {isExpanded
                  ? description
                  : `${description.slice(0, maxLength)}...`}
                {
                  <button
                    className="text-blue-500 p-4"
                    onClick={toggleDescription}
                  >
                    {isExpanded ? " show-less" : " ...more"}
                  </button>
                }
              </p>
            )}
          </div>
        ) : (
          <Link
            to={"/login"}
            className="text-gray-400 text-md shadow-2xl p-4 rounded-lg"
          >
            {" "}
            More video details... <hr />
          </Link>
        )}
      </div>

      {/* Comments Section */}
      <div className="hidden lg:block lg:w-1/4 ml-4 bg-gray-800 opacity-[70%] max-h-screen rounded-lg p-4">
        <h3 className="text-xl font-semibold mb-2 text-center">Comments</h3>
        <div>
          {/* Add comments fetching and displaying logic here */}
          <Comments
            videoId={videoId}
            isVideoAuthor={videoDetails?.owner?._id}
          />
        </div>
      </div>
    </div>
  );
}

export default PlayVideo;
