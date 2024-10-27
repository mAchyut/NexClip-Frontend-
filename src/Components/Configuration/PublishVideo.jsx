import React, { useState } from "react";
import { Button, Input } from "../CustomComponent/custom.js";
import { useForm } from "react-hook-form";
import { FaImage, FaPenFancy, FaPenNib, FaVideo } from "react-icons/fa";
import { videoService } from "../../backend/config.js";

function PublishVideo() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [alert, setAlert] = useState("");
  const [loading, setLoading] = useState(false);

  const publishVideo = async (data) => {
    setError("");
    setAlert("");
    try {
      if (data) {
        setLoading(true);
        const published = await videoService.publishAVideo({
          video: data.video[0],
          thumbnail: data.thumbnail[0],
          title: data.title,
          description: data.description,
        });
        if (published) {
          setAlert("Video published successfully");
        }
      }
    } catch (error) {
      setError(error?.message);
      setLoading(false);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setAlert("");
        setError("");
      }, 11000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 px-4 py-10 text-white">
      {/* Alerts and Error Messages */}
      <div className="fixed top-10 right-10 z-50 select-none">
        {error && (
          <p className="bg-red-600 p-3 rounded-lg shadow-lg text-center text-white text-sm transition-transform transform scale-105">
            {error}
          </p>
        )}
        {alert && (
          <p className="bg-green-600 p-3 rounded-lg shadow-lg text-center text-white transition-transform transform scale-105">
            {alert}
          </p>
        )}
      </div>

      <div className="bg-gray-800 max-w-2xl w-full p-8 rounded-2xl shadow-2xl hover:shadow-xl transition-all duration-500 transform hover:scale-105">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-100">
          Publish Your Video
        </h2>

        <form onSubmit={handleSubmit(publishVideo)} className="space-y-6">
          {/* Title Input */}
          <div className="flex items-center space-x-4">
            <FaPenFancy className="text-2xl text-blue-400" />
            <div className="w-full">
              <Input
                placeholder="Enter video title"
                className="bg-gray-700 text-white p-3 rounded-lg w-full shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-500 transition duration-300"
                {...register("title", { required: true })}
              />
            </div>
          </div>

          {/* Description Input */}
          <div className="flex items-center space-x-4">
            <FaPenNib className="text-2xl text-blue-400" />
            <div className="w-full">
              <Input
                placeholder="Enter video description"
                className="bg-gray-700 text-white p-3 rounded-lg w-full shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-500 transition duration-300"
                {...register("description", { required: true })}
              />
            </div>
          </div>

          {/* Video Upload Input */}
          <div className="flex items-center space-x-4">
            <FaVideo className="text-2xl text-blue-400" />
            <Input
              type="file"
              accept="video/*"
              className="bg-gray-700 text-white p-3 rounded-lg w-full shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-500 transition duration-300"
              {...register("video", { required: true })}
            />
          </div>

          {/* Thumbnail Upload Input */}
          <div className="flex items-center space-x-4">
            <FaImage className="text-2xl text-blue-400" />
            <Input
              type="file"
              accept="image/*"
              className="bg-gray-700 text-white p-3 rounded-lg w-full shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-500 transition duration-300"
              {...register("thumbnail", { required: true })}
            />
          </div>

          {/* Submit Button */}
          <Button
            className={`w-full py-3 ${
              loading ? "bg-gray-600" : "bg-blue-500 hover:bg-blue-600"
            } text-white font-semibold rounded-lg shadow-lg transition-transform transform hover:rounded-full duration-300`}
            disabled={loading}
          >
            {loading ? "Publishing..." : "Publish Video"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default PublishVideo;
