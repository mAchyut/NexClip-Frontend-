import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { videoService } from "../backend/config";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const queryParam = searchParams.get("search_query");
    setQuery(queryParam || null); // Handle case where query is undefined
  }, [searchParams]);

  useEffect(() => {
    const searchVideos = async () => {
      if (!query) return; // Prevent fetching if query is not valid
      setLoading(true); // Start loading

      try {
        const searchResults = await videoService.searchVideos(query);
        const filteredVideos = searchResults?.data?.videos?.filter(
          (video) => video?.isPublished
        );

        setVideos(filteredVideos || []);
      } catch (error) {
        console.error("Error fetching videos:", error);
        setError("Failed to fetch videos. Please try again.");
      } finally {
        setLoading(false); // Stop loading
        setError(null);
      }
    };

    searchVideos();
  }, [query]);

  return (
    <div className="max-w-6xl mx-auto mt-24 px-4 select-none">
      <h1 className="text-gray-400 text-3xl font-semibold mb-6">
        Search Results
      </h1>

      {loading && (
        <div className="text-center text-white text-xl">Loading...</div>
      )}
      {error && <div className="text-center text-red-500 text-xl">{error}</div>}
      {videos.length === 0 && !loading && (
        <div className="text-center text-gray-400 text-xl">
          No results found for "{query}"
        </div>
      )}

      {videos.map((video) => (
        <div
          key={video?._id}
          className="flex justify-between items-center mb-6 bg-gray-800 p-4 rounded-lg transition-all duration-300"
        >
          {/* Thumbnail and Video Info */}
          <Link
            className="flex space-x-4 opacity-100 hover:opacity-50"
            to={`/watch/${video?._id}`}
          >
            <img
              src={video?.thumbnail}
              alt={video?.title}
              className="w-40 h-24 object-cover rounded-md shadow-lg"
            />
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  {video?.title}
                </h2>
                <p
                  className="text-gray-400 text-sm mt-1"
                  style={{
                    wordWrap: "break-word", // Break long words only when necessary
                    whiteSpace: "normal", // Allow normal wrapping of the text
                    overflowWrap: "break-word",
                    wordBreak: "break-word",
                  }}
                >
                  {video?.description?.slice(0, 100)}...
                </p>
              </div>

              {/* Views and Uploaded Date */}
              <div className="text-gray-500 text-sm mt-2">
                <span>{video?.views} views</span>
                <span className="mx-2">•</span>
                <span>{new Date(video?.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </Link>

          {/* Channel Info */}
          <Link
            className="flex items-center space-x-2 opacity-100 hover:opacity-50"
            to={`/channel/${video?.owner?.username}`}
          >
            <img
              src={video?.owner?.avatar}
              alt={video?.owner?.username}
              className="w-12 h-12 rounded-full object-cover border-2 border-gray-500"
            />
            <span className="text-gray-300">{video?.owner?.username}</span>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default SearchResults;
