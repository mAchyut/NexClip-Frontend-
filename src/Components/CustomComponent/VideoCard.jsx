import React from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaTrashAlt } from "react-icons/fa";

function VideoCard({
  title,
  channelName,
  avatar,
  thumbnail,
  duration,
  views,
  createdAt,
  _id,
  isOwner = false,
  onDelete,
  clearHistoryVideo,
  togglePublish,
  isPublished,
  historyAccess,
}) {
  function formatDuration(durationInSeconds) {
    const totalSeconds = Math.floor(durationInSeconds);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    } else {
      return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }
  }

  const timeSince = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);

    let interval = Math.floor(seconds / 31536000); // seconds in a year
    if (interval > 1) return `${interval} years ago`;

    interval = Math.floor(seconds / 2592000); // seconds in a month
    if (interval > 1) return `${interval} months ago`;

    interval = Math.floor(seconds / 604800); // seconds in a week
    if (interval > 1) return `${interval} weeks ago`;

    interval = Math.floor(seconds / 86400); // seconds in a day
    if (interval > 1) return `${interval} days ago`;

    interval = Math.floor(seconds / 3600); // seconds in an hour
    if (interval > 1) return `${interval} hours ago`;

    interval = Math.floor(seconds / 60); // seconds in a minute
    if (interval > 1) return `${interval} minutes ago`;

    return `${Math.floor(seconds)} seconds ago`;
  };

  return (
    (isPublished || isOwner || historyAccess) && (
      <div className="bg-gray-900 text-white p-4 rounded-lg shadow-md hover:shadow-2xl transition-shadow duration-300 ease-in-out relative">
        {/* Thumbnail and Video Duration */}
        <Link to={`/watch/${_id}`} className="block relative">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-48 object-cover rounded-lg"
          />
          <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-sm p-1 rounded">
            {duration && <p>{formatDuration(duration)}</p>}
          </span>
        </Link>

        {/* Video Info */}
        <div className="flex mt-4 space-x-4">
          {/* Channel Avatar */}
          <Link
            to={`/channel/${channelName}`}
            className="hover:text-gray-300 transition-colors duration-200"
          >
            <img
              src={avatar}
              alt={`${channelName}'s Avatar`}
              className="w-10 h-10 object-cover rounded-full"
            />
          </Link>

          {/* Title, Channel Info, and Buttons */}
          <div className="flex-1 flex flex-col justify-between truncate">
            <Link
              to={`/watch/${_id}`}
              className="text-lg font-bold hover:text-gray-400 transition-colors duration-200 truncate"
              style={{ maxWidth: isOwner ? "70%" : "100%" }}
            >
              {title}
            </Link>
            <div className="text-gray-400 text-sm mt-1">
              <Link
                to={`/channel/${channelName}`}
                className="hover:text-gray-300 transition-colors duration-200"
              >
                {channelName}
              </Link>
              <p className="mt-1">
                <span>
                  {views} views • {createdAt && timeSince(createdAt)}
                </span>
              </p>
            </div>
          </div>

          {/* Edit and Delete Buttons (for Owner) */}
          {isOwner && (
            <div className="flex items-center space-x-3 absolute right-0">
              <Link
                className="p-2 text-gray-300 border border-blue-900 rounded-xl hover:bg-gray-800 hover:text-blue-700"
                to={`/channel/${channelName}/video/${_id}/edit`}
              >
                Edit
              </Link>
              <button
                className="p-2 text-gray-300 border border-red-900 rounded-lg hover:bg-gray-800 hover:text-red-700"
                onClick={() => onDelete(_id)}
              >
                Delete
              </button>
            </div>
          )}
          {clearHistoryVideo && (
            <button
              className="w-0.1"
              onClick={() => clearHistoryVideo({ videoId: _id })}
            >
              {
                // <FaTrash className="text-xl hover:text-red-700 hover:cursor-pointer" />
                <FaTrashAlt className="text-xl hover:text-red-700 mr-2" />
              }
            </button>
          )}
          {isOwner && togglePublish && (
            <button
              onClick={() => togglePublish({ videoId: _id })}
              className={`mt-12 text-sm p-2 shadow-xl text-gray-400 ${
                isPublished ? " hover:text-red-800" : " hover:text-green-600"
              } `}
            >
              {isPublished ? "Unpublish" : "Publish"}
            </button>
          )}
        </div>
      </div>
    )
  );
}

export default VideoCard;
