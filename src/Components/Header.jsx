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
  FaBars,
} from "react-icons/fa";
import { Sidebar as Usermenu } from "./CustomComponent/Sidebar"; // Import Sidebar component

function Header({ Outlet }) {
  const userLoginState = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth?.userData);
  const [isSidebarOpen, setSidebarOpen] = useState(false); // Sidebar state
  const [isUsermenuOpen, setIsUsermenuOpen] = useState(false); // usermenu state
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev); // Toggle sidebar
  };
  const toggleUsermenu = () => {
    setIsUsermenuOpen((prev) => !prev); // Toggle usermenu
  };

  useEffect(() => {
    !userLoginState && setSidebarOpen(false);
  }, [userLoginState]);

  const searchQuery = () => {
    if (query) {
      navigate(`/results?search_query=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="flex flex-col h-screen md:flex-row">
      {/* Sidebar Section */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white flex flex-col justify-between p-4 transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 z-20`}
      >
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
              className="hover:text-gray-300 flex items-center mt-4 transition-colors duration-200"
            >
              <span className="text-xl mr-4">{<FaRegNewspaper />}</span>{" "}
              Subscriptions
            </NavLink>

            {userLoginState && (
              <NavLink
                to="/channel/dashboard/stats"
                className="hover:text-gray-300 flex items-center mt-4 transition-colors duration-200"
              >
                <span className="text-xl mr-4">{<FaLaptop />}</span> Dashboard
              </NavLink>
            )}

            <hr className="border-gray-700 my-4" />
            <span className="font-bold text-gray-500 mt-4">You</span>

            {userLoginState && (
              <NavLink
                to={`channel/${userData?.username}`}
                className="hover:text-gray-300 flex items-center mt-4 transition-colors duration-200"
              >
                <span className="text-xl mr-4">{<FaYoutube />}</span> Your
                channel
              </NavLink>
            )}

            <NavLink
              to="/history"
              className="hover:text-gray-300 flex items-center mt-4 transition-colors duration-200"
            >
              <span className="text-xl mr-4">{<FaHistory />}</span> History
            </NavLink>

            <NavLink
              to="/playlists"
              className="hover:text-gray-300 flex items-center mt-4 transition-colors duration-200"
            >
              <span className="text-xl mr-4">{<FaListAlt />}</span> Playlists
            </NavLink>

            <NavLink
              to="/your-videos"
              className="hover:text-gray-300 flex items-center mt-4 transition-colors duration-200"
            >
              <span className="text-xl mr-4">{<FaVideo />}</span> Your videos
            </NavLink>

            {userLoginState && (
              <NavLink
                to="/liked-videos"
                className="hover:text-gray-300 flex items-center mt-4 transition-colors duration-200"
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
          className="hover:text-gray-300 flex items-center mt-4 transition-colors duration-200"
        >
          <span className="text-xl mr-2">{<FaInfoCircle />}</span> 𝒾𝓃𝒻𝒪
        </NavLink>
      </aside>

      {/* Main Content Section */}
      <div className="flex-grow bg-gray-100 md:ml-64 overflow-auto">
        {/* Topbar */}
        <header className="bg-gray-900 text-white flex justify-between items-center p-3 fixed top-0 left-0 w-full md:left-64 md:w-[calc(100%-16rem)] z-10">
          {/* Hamburger Icon (Only on Small Screens) */}
          <button
            onClick={toggleSidebar}
            className="text-2xl md:hidden text-gray-300 hover:text-blue-500 mr-4"
          >
            <FaBars />
          </button>

          {/* Search Bar */}
          <div className="flex items-center justify-center flex-grow">
            <div className="flex w-full md:w-1/2 bg-gray-700 bg-opacity-80 rounded-full shadow-lg">
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

          {/* Profile or Login/Signup */}
          <div className="flex items-center">
            {userLoginState ? (
              <button
                onClick={toggleUsermenu}
                className="text-3xl text-gray-300 hover:text-blue-500 border border-gray-900 hover:border-gray-700 transition-colors duration-300 mx-4"
              >
                <FaUserCircle />
              </button>
            ) : (
              <>
                <Link
                  to={"/login"}
                  className="mr-4 border border-gray-700 hover:bg-gray-700 rounded-full px-4 py-2 text-gray-300 transition-all duration-300"
                >
                  Login
                </Link>
                <Link
                  to={"/signup"}
                  className="border border-gray-700 hover:bg-gray-700 rounded-full px-4 py-2 text-gray-300 transition-all duration-300"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </header>

        {/* Sidebar Component (Responsive) */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-10 ${
            isSidebarOpen ? "block" : "hidden"
          } md:hidden`}
          onClick={toggleSidebar}
        />
        {/* usermenu component */}
        <div>
          <Usermenu isOpen={isUsermenuOpen} onClose={toggleUsermenu} />
        </div>

        {/* Page Content */}
        <main className="pt-16 md:pt-0 bg-gray-900 min-h-screen overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Header;
