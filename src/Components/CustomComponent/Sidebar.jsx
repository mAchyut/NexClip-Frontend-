import React from "react";
import LogoutBtn from "../Authentication/LogoutBtn";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { FiX } from "react-icons/fi"; // Close icon for modern look

function Sidebar({ isOpen, onClose }) {
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();

  const handleSettingChange = (e) => {
    const value = e.target.value;
    if (value) {
      navigate(value); // Redirect based on the selected value
    }
  };

  return (
    <aside
      className={`z-30 fixed right-0 top-0 w-72 h-full bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="relative flex flex-col h-full p-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition-colors duration-300"
        >
          <FiX size={24} />
        </button>

        {/* User Profile */}
        <div className="flex items-center mb-8 mt-4">
          {userData?.avatar ? (
            <img
              src={userData.avatar}
              width={48}
              className="rounded-full mr-4"
              alt="avatar-image"
            />
          ) : (
            <FaUserCircle size={48} className="text-gray-500 mr-4" />
          )}
          <div>
            <h2 className="text-xl font-semibold text-gray-200">
              {userData?.username || "Guest"}
            </h2>
            <Link
              to={`/${userData?.username}/profile`}
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-300"
            >
              View Profile
            </Link>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-grow">
          <ul className="space-y-6">
            {/* Profile Link */}
            <li>
              <Link
                to={`/${userData?.username}/profile`}
                className="text-lg font-medium text-gray-400 hover:text-white transition-colors duration-300"
              >
                Profile
              </Link>
            </li>

            {/* Settings */}
            <li>
              <div className="relative">
                <select
                  onChange={handleSettingChange}
                  className="block w-full p-3 bg-gray-800 text-gray-300 rounded-lg focus:outline-none hover:bg-gray-700 transition duration-300 hover:cursor-pointer"
                >
                  <option value="">Settings</option>
                  <option value="/update-details">Update Details</option>
                  <option value="/change-password">Change Password</option>
                  <option value="/publish-video">Publish Video</option>
                </select>
              </div>
            </li>

            {/* Logout Button */}
            <li>
              <LogoutBtn />
            </li>
          </ul>
        </nav>

        {/* Footer */}
        <footer className="mt-auto text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} NexClip
          </p>
        </footer>
      </div>
    </aside>
  );
}

export { Sidebar };
