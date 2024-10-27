// import React, { useState, useEffect } from "react";
// import VideoCard from "../CustomComponent/VideoCard.jsx";
// import { videoService } from "../../backend/config.js";

// function GetAllVideos() {
//   const [videos, setVideos] = useState([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);

//   // Function to load videos in batches of 15
//   const loadVideos = async () => {
//     setLoading(true);
//     try {
//       const response = await videoService.getAllVideos(page); // Assuming the API accepts page number
//       if (response) {
//         const filteredVideos = response.data?.videos.filter(
//           (video) => video?.isPublished
//         );
//         if (filteredVideos) setVideos(filteredVideos);
//       }
//     } catch (error) {
//       console.log(error?.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch initial videos and load more on scroll
//   useEffect(() => {
//     loadVideos();
//   }, [page]);

//   // Scroll event to load more videos
//   useEffect(() => {
//     const handleScroll = () => {
//       if (
//         window.innerHeight + document.documentElement.scrollTop + 100 >=
//         document.documentElement.scrollHeight
//       ) {
//         setPage((prevPage) => prevPage + 1);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return !videos?.length == 0 ? (
//     <>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
//         {videos.map((video) => (
//           <VideoCard
//             key={video?._id}
//             avatar={video.owner?.avatar}
//             channelName={video.owner?.username}
//             {...video}
//           />
//         ))}
//       </div>
//       <div className="text-center">
//         {loading && <p className="text-center text-white">Loading more...</p>}
//       </div>
//     </>
//   ) : (
//     <div className="max-h-screen items-center flex justify-center">
//       <p className="select-none text-gray-400 text-center transform translate-y-80">
//         There is currently no active posts.
//       </p>
//     </div>
//   );
// }

// export default GetAllVideos;

import React, { useState, useEffect, useRef } from "react";
import VideoCard from "../CustomComponent/VideoCard.jsx";
import { videoService } from "../../backend/config.js";
import Loading from "../../Logo/Loading3.gif";

function GetAllVideos() {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const loadMoreRef = useRef(null);

  // Function to load videos
  const loadVideos = async (pageToLoad) => {
    console.log("Loading page:", pageToLoad);
    setLoading(true);
    try {
      const response = await videoService.getAllVideos({ page: pageToLoad });
      if (response) {
        const filteredVideos = response.data?.videos.filter(
          (video) => video?.isPublished
        );
        setVideos((prevVideos) => [
          ...prevVideos,
          ...filteredVideos.filter(
            (newVideo) => !prevVideos.find((v) => v._id === newVideo._id)
          ),
        ]);
      }
    } catch (error) {
      console.log("Error loading videos:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch videos on page change
  useEffect(() => {
    loadVideos(page);
  }, [page]);

  // Set up IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { rootMargin: "100px" }
    );
    if (loadMoreRef.current) observer.observe(loadMoreRef.current);

    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
        {videos.map((video) => (
          <VideoCard
            key={video?._id}
            avatar={video.owner?.avatar}
            channelName={video.owner?.username}
            {...video}
          />
        ))}
      </div>
      <div ref={loadMoreRef} className="text-center my-2">
        {loading && (
          <div className="flex justify-center">
            <img
              src={Loading}
              className="max-w-[3%]"
              draggable={false}
              alt="loading..."
            />
          </div>
        )}
      </div>
    </>
  );
}

export default GetAllVideos;
