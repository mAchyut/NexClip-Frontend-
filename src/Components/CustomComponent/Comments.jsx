import React, { useEffect, useState } from "react";
import { commentService } from "../../backend/config.js";
import { Input, Button } from "./custom.js"; // Assuming you have custom Input and Button components
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { FaComment, FaRegEdit, FaSave, FaTrashAlt } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

function Comments({ videoId, isVideoAuthor }) {
  const [refresh, setRefresh] = useState(false);
  const { handleSubmit, register, reset, setValue } = useForm();
  const [videoComments, setVideoComments] = useState([]);
  const currentUser = useSelector((state) => state?.auth?.userData);
  const [error, setError] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null); // Track the comment being edited
  const [editedContent, setEditedContent] = useState(""); // Track edited content

  useEffect(() => {
    const getVideoComments = async () => {
      if (!videoId) return;
      const comments = await commentService.getVideoComments(videoId);
      if (comments) {
        setVideoComments(comments?.data);
      }
    };
    getVideoComments();
  }, [refresh, videoId, currentUser]);

  const addComment = async (data) => {
    setError("");
    if (!videoId || !data || !currentUser) return;
    setRefresh(false);
    try {
      if (data?.comment?.trim().split(" ").length > 100) {
        throw new Error("Words limit is 100");
      }
      const response = await commentService.addComment(videoId, data);
      if (response) {
        setRefresh(true);
        reset(); // Reset the form after comment submission
      }
    } catch (error) {
      setError(error?.message);
    } finally {
      setTimeout(() => {
        setError("");
      }, 4000);
    }
  };

  const toggleEditComment = (comment) => {
    if (editingCommentId === comment?._id) {
      // If already in edit mode, cancel the editing
      setEditingCommentId(null);
      setEditedContent(""); // Reset edited content
    } else {
      // Switch to edit mode for the selected comment
      setEditingCommentId(comment?._id);
      setEditedContent(comment?.content); // Set current content for editing
    }
  };

  const handleEditedContentChange = (e) => {
    setEditedContent(e.target.value);
  };

  const saveEditedContent = async (commentId) => {
    setRefresh(false);
    if (!commentId || !editedContent.trim()) return;
    try {
      const response = await commentService.updateComment(commentId, {
        comment: editedContent,
      });
      if (response) {
        setRefresh(true);
        setEditingCommentId(null); // Exit edit mode after saving
      }
    } catch (error) {
      setError("Failed to save comment.");
    }
  };

  const deleteComment = async (commentId) => {
    setRefresh(false);
    if (!videoId || !currentUser) return;
    const response = await commentService.deleteComment(commentId);
    if (response) {
      setRefresh(true);
    }
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-md w-full space-y-6">
      {/* Add Comment Section */}
      {currentUser && (
        <form
          onSubmit={handleSubmit(addComment)}
          className="flex items-center space-x-1 mb-6"
        >
          <img
            src={currentUser?.avatar}
            alt="avatar"
            className="w-8 h-8 rounded-full border-2 border-gray-700"
            draggable={false}
          />
          <div className="flex items-center justify-center w-full">
            <Input
              placeholder="Enter your comment..."
              className="bg-gray-800 text-white rounded-l-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              {...register("comment", { required: true })}
            />
            <Button
              type="submit"
              className="p-3 bg-gray-700 border border-gray-800 hover:bg-gray-700 hover:text-blue-500 transition-all duraion-300 text-sm rounded-r-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <FaComment />
            </Button>
          </div>
        </form>
      )}
      <div className="fixed top-10 right-10 z-50">
        {error && (
          <p className="bg-red-800 p-2 rounded-md shadow-2xl text-center text-sm transition-transform transform scale-105">
            {error}
          </p>
        )}
      </div>
      {/* Display Comments */}
      <div
        className="space-y-4 max-h-96 overflow-y-auto no-scrollbar"
        style={{
          scrollbarWidth: "none", // Hide scrollbar in Firefox
          msOverflowStyle: "none", // Hide scrollbar in IE and Edge
        }}
      >
        {videoComments?.map((comment) => (
          <div
            key={comment?._id}
            className="flex justify-between items-start bg-gray-800 p-3 rounded-lg shadow-sm w-full"
          >
            <div className="flex items-start space-x-3 w-full">
              {/* Adjust the comment content container */}
              <div className="flex-grow break-words">
                <Link
                  className="text-white font-semibold"
                  to={`/channel/${comment?.owner?.username}`}
                >
                  <div className="flex itmes-center space-x-1">
                    <img
                      src={comment?.owner?.avatar}
                      className="w-8 h-8 rounded-full border-2 border-gray-700"
                      alt={comment?.owner?.username}
                      draggable={false}
                    />
                    <p
                      className={`${
                        isVideoAuthor === comment?.owner?._id &&
                        "bg-gradient-to-r from-amber-500 to-rose-800 bg-clip-text text-transparent"
                      }`}
                    >
                      {comment?.owner?.username}
                      {isVideoAuthor === comment?.owner?._id && (
                        <span className="text-sm"> ♕</span>
                      )}
                    </p>
                  </div>
                </Link>
                {editingCommentId === comment?._id ? (
                  <textarea
                    value={editedContent}
                    onChange={handleEditedContentChange}
                    className="text-gray-400 bg-gray-700 rounded-lg"
                  />
                ) : (
                  <p
                    className="text-gray-400 break-words w-full ml-2"
                    style={{
                      wordWrap: "break-word", // Break long words only when necessary
                      whiteSpace: "normal", // Allow normal wrapping of the text
                      overflowWrap: "break-word",
                      wordBreak: "break-word",
                    }}
                  >
                    {comment?.content}
                  </p>
                )}
              </div>
            </div>

            {/* Button container */}
            {currentUser?._id === comment?.owner?._id && (
              <div className="flex items-center space-x-2">
                <button
                  className="text-blue-400 hover:text-blue-500"
                  onClick={() => toggleEditComment(comment)}
                >
                  {editingCommentId === comment?._id ? (
                    <div className="flex space-x-2 items-center">
                      <FaSave
                        className="text-green-500"
                        onClick={() => saveEditedContent(comment?._id)}
                      />
                      <FiX onClick={() => toggleEditComment(comment)} />
                    </div>
                  ) : (
                    <FaRegEdit />
                  )}
                </button>
                {editingCommentId !== comment?._id && (
                  <button
                    className="text-red-400 hover:text-red-500"
                    onClick={() => deleteComment(comment?._id)}
                  >
                    <FaTrashAlt />
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comments;
