import React, { useState } from "react";
import { FaPen, FaUserCheck, FaAt, FaUser, FaClock } from "react-icons/fa";
import { Button, Input } from "../CustomComponent/custom";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import authService from "../../backend/auth";

function Profile() {
  const { handleSubmit, register } = useForm();
  const [alert, setAlert] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [coverPreview, setCoverPreview] = useState("");

  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth?.userData);
  const { username } = useParams();

  if (username !== currentUser?.username) navigate("/");

  const handleImageChange = (e, setPreview) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (data) => {
    setAlert("");
    setError("");
    if (data) {
      setLoading(true);
      try {
        const imageUpload = await authService.updateImageFiles(data);
        if (imageUpload) setAlert("Image uploaded successfully");
      } catch (err) {
        setError(err?.message);
      } finally {
        setLoading(false);
        setTimeout(() => {
          window.location.reload();
          setError("");
          setAlert("");
          setAvatarPreview("");
          setCoverPreview("");
        }, 5000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center p-4">
      <div className="absolute bottom-20">
        {error && <p className="text-red-500">{error}</p>}
        {alert && <p className="text-green-500">{alert}</p>}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-4xl">
        {/* Cover Image */}
        <div className="relative w-full mb-10">
          <img
            src={
              coverPreview ||
              currentUser?.coverImage ||
              "/path-to-default-cover"
            }
            alt="Cover"
            className="w-full h-52 object-cover rounded-lg shadow-md"
          />
          <div className="absolute inset-0 flex justify-end p-4 opacity-0 hover:opacity-100 bg-black bg-opacity-50 transition duration-300 ease-in-out rounded-lg">
            <Input
              type="file"
              className="w-0"
              accept="image/*"
              label={<FaPen className="text-white text-2xl cursor-pointer" />}
              {...register("coverImage")}
              onChange={(e) => handleImageChange(e, setCoverPreview)}
            />
          </div>
        </div>

        {/* Profile Image */}
        <div className="relative flex justify-center">
          <div className="absolute bottom-1/2">
            <img
              src={
                avatarPreview ||
                currentUser?.avatar ||
                "/path-to-default-avatar"
              }
              alt="Profile"
              className="w-36 h-36 object-cover rounded-full border-4 border-gray-700 shadow-md"
            />
            <div className="absolute inset-0 flex justify-center items-center opacity-0 hover:opacity-100 bg-black bg-opacity-50 transition duration-300 ease-in-out rounded-full">
              <Input
                type="file"
                className="w-0"
                accept="image/*"
                label={<FaPen className="text-white text-2xl cursor-pointer" />}
                {...register("avatar")}
                onChange={(e) => handleImageChange(e, setAvatarPreview)}
              />
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-center">
              <FaUserCheck className="text-2xl mr-3 text-blue-400" />
              <span className="text-lg">Username: {currentUser?.username}</span>
            </div>

            <div className="flex items-center">
              <FaAt className="text-2xl mr-3 text-blue-400" />
              <span className="text-lg">Email: {currentUser?.email}</span>
            </div>

            <div className="flex items-center">
              <FaUser className="text-2xl mr-3 text-blue-400" />
              <span className="text-lg">
                Full Name: {currentUser?.fullName}
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center">
              <FaClock className="text-2xl mr-3 text-blue-400" />
              <span className="text-lg">
                Joined: {new Date(currentUser?.createdAt).toUTCString()}
              </span>
            </div>

            <div className="flex items-center">
              <FaClock className="text-2xl mr-3 text-blue-400" />
              <span className="text-lg">
                Last Updated:{" "}
                {new Date(currentUser?.updatedAt).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Save Button */}
        {(avatarPreview || coverPreview) && (
          <div className="mt-12 text-center">
            <Button
              type="submit"
              className={`w-full max-w-sm p-3 text-white font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:rounded-full ${
                loading
                  ? "bg-gray-500"
                  : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
              }`}
              disable={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}

export default Profile;
