import React from "react";

const Playlist = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <div className="text-center">
        {/* Heading */}
        <h1 className="text-4xl font-bold mb-4 animate-pulse">
          Exciting Features Coming Soon!
        </h1>

        {/* Subheading */}
        <p className="text-lg text-gray-400 mb-6">
          We&apos;re working hard to bring you new updates. Stay tuned for
          something amazing!
        </p>

        {/* Animated Dots */}
        <div className="flex justify-center items-center space-x-2 mt-6">
          <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce"></div>
          <div className="w-4 h-4 bg-green-600 rounded-full animate-bounce delay-150"></div>
          <div className="w-4 h-4 bg-red-600 rounded-full animate-bounce delay-300"></div>
        </div>

        {/* Call to Action */}
        <p className="text-gray-500 mt-8">
          In the meantime, check out other parts of NexClip!
        </p>
      </div>
    </div>
  );
};

export default Playlist;
