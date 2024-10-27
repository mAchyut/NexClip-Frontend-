import React, { useEffect, useState } from "react";
import { videoService } from "../../backend/config.js";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Input, Button } from "../CustomComponent/custom.js";
import { FaEdit, FaImage, FaRegEdit } from "react-icons/fa";

function EditVideo() {
  const { videoId, username } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [alert, setAlert] = useState("");
  const [loading, setLoading] = useState(false);
  const [foundVideo, setFoundVideo] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  const findVideo = async () => {
    if (!videoId) return;
    const video = await videoService.getVideoById(videoId);
    if (video) {
      setFoundVideo(video?.data);
    }
  };

  useEffect(() => {
    findVideo();
  }, [videoId]);

  useEffect(() => {
    reset({
      title: foundVideo?.title || "",
      description: foundVideo?.description || "",
    });
  }, [foundVideo]);

  const editVideo = async (data) => {
    setError("");
    setAlert("");
    console.log(data);
    if (!videoId || !foundVideo) return;
    try {
      setLoading(true);
      if (data) {
        const result = await videoService.updateVideo(videoId, {
          title: data?.title,
          description: data?.description,
          thumbnail: data?.thumbnail[0],
        });
        if (result) {
          setAlert("Video details updated successfully");
        }
      }
    } catch (error) {
      setError(error?.message);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setAlert("");
        setError("");
      }, 4000);
    }
  };

  return foundVideo ? (
    <div className="min-h-screen flex items-center justify-center w-full bg-gray-900 text-white pt-16">
      {/* Alerts and Error Messages */}
      <div className="absolute bottom-5 text-center">
        {error && <p className="text-red-500">{error}</p>}
        {alert && <p className="text-green-500">{alert}</p>}
      </div>

      <div className="bg-gray-800 w-full max-w-3xl text-white p-6 rounded-lg shadow-xl transition-shadow duration-300 ease-in-out m-4">
        <h2 className="text-xl text-gray-600 text-center p-2">
          {foundVideo?.title}(Edit)
        </h2>

        {/* Thumbnail Preview */}
        <div className="flex justify-center mb-6">
          <img
            src={foundVideo?.thumbnail}
            alt={"edit " + videoId}
            className="rounded-md shadow-lg w-2/3 sm:w-1/2"
            draggable={false}
          />
        </div>

        <form onSubmit={handleSubmit(editVideo)} className="space-y-6">
          {/* Title Input */}
          <div className="flex items-center space-x-3">
            <FaEdit className="text-2xl text-gray-400" />
            <div className="w-full">
              <Input
                placeholder="New video title"
                className="bg-gray-700 text-white p-2 rounded-md w-full"
                {...register("title")}
              />
            </div>
          </div>

          {/* Description Input */}
          <div className="flex items-center space-x-3">
            <FaRegEdit className="text-2xl text-gray-400" />
            <div className="w-full">
              <Input
                placeholder="New video description"
                className="bg-gray-700 text-white p-2 rounded-md w-full"
                {...register("description")}
              />
            </div>
          </div>

          {/* Thumbnail Upload Input */}
          <div className="flex items-center space-x-3">
            <FaImage className="text-2xl text-gray-400" />
            <Input
              type="file"
              accept="image/*"
              className="bg-gray-700 text-white w-full p-2 rounded-md"
              {...register("thumbnail")}
            />
          </div>

          {/* Submit Button */}
          <div className="w-full text-center">
            <Button
              className={`py-3 ${
                loading
                  ? "bg-gray-600"
                  : "bg-gray-700 hover:bg-gray-600 hover:rounded-full"
              } text-white font-semibold rounded-lg transition-colors duration-300 w-1/2`}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Details"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
}

export default EditVideo;
