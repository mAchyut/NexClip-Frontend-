import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  FaHistory,
  FaHome,
  FaInfoCircle,
  FaLaptop,
  FaListAlt,
  FaRegNewspaper,
  FaThumbsUp,
  FaUserCircle,
  FaVideo,
  FaYoutube,
} from "react-icons/fa";
import Sidebar from "./CustomComponent/Sidebar"; // Ensure you import your Sidebar component

function Header({ Outlet }) {
  const userLoginState = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth?.userData);
  const [isSidebarOpen, setSidebarOpen] = useState(false); // Set initial state to false
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev); // Toggle sidebar visibility
  };
  useEffect(() => {
    !userLoginState && setSidebarOpen(false);
  }, [userLoginState]);

  const searchQuery = () => {
    if (query) {
      navigate(`/results?search_query=${encodeURIComponent(query?.trim())}`);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar Section */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col justify-between p-4 fixed h-screen">
        <div>
          {/* NexClip Logo */}
          <Link to="/" className="mb-6 flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
            <p className="text-2xl font-extrabold text-gray-300 tracking-wide select-none">
              NexClip
            </p>
          </Link>

          {/* Menu Options */}
          <nav className="flex flex-col space-y-3">
            <NavLink
              to="/"
              className="hover:text-gray-300 flex items-center mt-4 transition-colors duration-200"
            >
              <span className="text-xl mr-4">{<FaHome />}</span> Home
            </NavLink>

            <NavLink
              to={`/${userData?._id}/mysubscriptions`}
              className="hover:text-gray-300 flex items-center mt-4  transition-colors duration-200"
            >
              <span className="text-xl mr-4">{<FaRegNewspaper />}</span>{" "}
              Subscriptions
            </NavLink>

            {userLoginState && (
              <NavLink
                to="/channel/dashboard/stats"
                className="hover:text-gray-300 flex items-center mt-4  transition-colors duration-200"
              >
                <span className="text-xl mr-4">{<FaLaptop />}</span> Dashboard
              </NavLink>
            )}

            <hr className="border-gray-700 my-4" />
            <span className="font-bold text-gray-500 mt-4">You</span>

            {userLoginState && (
              <NavLink
                to={`channel/${userData?.username}`}
                className="hover:text-gray-300 flex items-center mt-4  transition-colors duration-200"
              >
                <span className="text-xl mr-4">{<FaYoutube />}</span> Your
                channel
              </NavLink>
            )}

            <NavLink
              to="/history"
              className="hover:text-gray-300 flex items-center mt-4  transition-colors duration-200"
            >
              <span className="text-xl mr-4">{<FaHistory />}</span> History
            </NavLink>

            <NavLink
              to="/playlists"
              className="hover:text-gray-300 flex items-center mt-4  transition-colors duration-200"
            >
              <span className="text-xl mr-4">{<FaListAlt />}</span> Playlists
            </NavLink>

            <NavLink
              to="/your-videos"
              className="hover:text-gray-300 flex items-center mt-4  transition-colors duration-200"
            >
              <span className="text-xl mr-4">{<FaVideo />}</span> Your videos
            </NavLink>

            {userLoginState && (
              <NavLink
                to="/liked-videos"
                className="hover:text-gray-300 flex items-center mt-4  transition-colors duration-200"
              >
                <span className="text-xl mr-4">{<FaThumbsUp />}</span> Liked
                videos
              </NavLink>
            )}
          </nav>
        </div>

        {/* Settings */}
        <NavLink
          to="/NexClip/info"
          className="hover:text-gray-300 flex items-center mt-4  transition-colors duration-200"
        >
          <span className="text-xl mr-2">{<FaInfoCircle />}</span> 𝒾𝓃𝒻𝒪
        </NavLink>
      </aside>

      {/* Main Content Section */}
      <div className="flex-grow bg-gray-100 ml-64 overflow-auto">
        {/* Topbar */}
        <header className="bg-gray-900 text-white flex justify-between items-center p-3 fixed top-0 left-64 w-[calc(100%-16rem)] z-10">
          {/* Search Bar (Center) */}
          <div className="flex items-center justify-center w-full">
            <div className="flex w-1/2 bg-gray-700 bg-opacity-80 rounded-full shadow-lg">
              <input
                type="text"
                placeholder="Search..."
                className="w-full p-3 pl-5 rounded-l-full bg-gray-800 bg-opacity-90 text-gray-300 focus:outline-none transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    searchQuery();
                  }
                }}
              />
              <button
                className="p-3 pr-5 rounded-r-full bg-blue-600 hover:bg-blue-500 text-white transition-all duration-300 ease-in-out"
                onClick={searchQuery}
              >
                <span className="text-2xl">⌕</span>
              </button>
            </div>
          </div>

          {/* Profile Icon (Right) */}
          <div className="flex items-center">
            {/* Sidebar toggle button */}
            <button
              onClick={toggleSidebar}
              className="text-3xl text-gray-300 hover:text-blue-500 border border-gray-900 hover:border-gray-700 transition-colors duration-300 mr-6"
            >
              {userLoginState && <FaUserCircle />}
            </button>

            {/* Login and Signup Links */}
            {!userLoginState && (
              <Link
                to={"/login"}
                className="mr-4 border border-gray-700 hover:bg-gray-700 rounded-full px-4 py-2 text-gray-300 transition-all duration-300"
              >
                Login
              </Link>
            )}
            {!userLoginState && (
              <Link
                to={"/signup"}
                className="border border-gray-700 hover:bg-gray-700 rounded-full px-4 py-2 text-gray-300 transition-all duration-300"
              >
                Signup
              </Link>
            )}
          </div>
        </header>

        {/* Sidebar component */}
        <div>
          <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
        </div>

        {/* Page Content */}
        <div className=" bg-gray-900 min-h-screen overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Header;
