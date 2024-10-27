import React, { useState } from "react";
import {
  FaShareAlt,
  FaCopy,
  FaWhatsapp,
  FaEnvelope,
  FaCheckCircle,
  FaTelegramPlane,
} from "react-icons/fa";

function ShareMenu({ videoId }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [copy, setCopy] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCopyUrl = () => {
    setCopy(true);
    const videoUrl = `${window.location.origin}/watch/${videoId}`;
    navigator.clipboard.writeText(videoUrl);
    setTimeout(() => {
      setCopy(false);
    }, 3000); // Show 'Copied' for 3 seconds
  };

  const shareOptions = [
    {
      icon: copy ? (
        <FaCheckCircle className="mr-2 text-green-400" />
      ) : (
        <FaCopy className="mr-2" />
      ),
      label: `${copy ? "Copied!" : "Copy URL"}`,
      onClick: handleCopyUrl,
    },
    {
      icon: <FaWhatsapp className="mr-2 text-green-500" />,
      label: "WhatsApp",
      onClick: () => {
        const videoUrl = `${window.location.origin}/watch/${videoId}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(videoUrl)}`);
      },
    },
    {
      icon: <FaEnvelope className="mr-2 text-yellow-400" />,
      label: "Email",
      onClick: () => {
        const videoUrl = `${window.location.origin}/watch/${videoId}`;
        window.open(
          `mailto:?subject=Check this video&body=${encodeURIComponent(
            videoUrl
          )}`
        );
      },
    },
    {
      icon: <FaTelegramPlane className="mr-2 text-blue-400" />,
      label: "Telegram",
      onClick: () => {
        const videoUrl = `${window.location.origin}/watch/${videoId}`;
        window.open(
          `https://t.me/share/url?url=${encodeURIComponent(videoUrl)}`
        );
      },
    },
  ];

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="flex items-center border border-gray-700 hover:bg-gray-800 p-2 rounded-r-full text-white transition-all duration-300"
      >
        <FaShareAlt className="mr-2" /> Share
      </button>

      {/* Dropdown menu */}
      {isMenuOpen && (
        <div
          className="absolute bottom-full right-1 w-52 bg-gray-800 rounded-lg shadow-lg z-10 transition-transform transform scale-95 origin-top-right"
          style={{ maxHeight: "300px", overflowY: "auto" }} // Prevent overflow
        >
          <ul className="py-2">
            {shareOptions.map((option, index) => (
              <li
                key={index}
                onClick={option.onClick}
                className="flex items-center px-4 py-2 text-white hover:bg-gray-700 cursor-pointer transition-all duration-300"
              >
                {option.icon} {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ShareMenu;
