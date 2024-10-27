import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

function SubscriptionCard({ username, avatar }) {
  return (
    <Link
      to={`/channel/${username}`}
      className="flex items-center bg-gray-800 rounded-lg p-2 space-x-4 w-72 shadow-md justify-center transform hover:scale-105 transition-transform cursor-pointer"
    >
      {/* Avatar */}
      <img
        src={avatar}
        alt={`${username}'s avatar`}
        className="w-10 h-10 rounded-full"
      />

      {/* Username */}
      <div className="flex-grow text-white">
        <p className="truncate">{username}</p>
      </div>

      {/* Arrow icon */}
      <FaArrowRight className="text-white hover:translate-x-1 transition-transform duration-300" />
    </Link>
  );
}

export default SubscriptionCard;
