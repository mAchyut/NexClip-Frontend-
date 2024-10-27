import React, { useEffect } from "react";

const Toast = ({ type, message, show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Auto-close after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    show && (
      <div
        className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-md shadow-lg flex items-center transition-opacity duration-500 ${
          type === "success"
            ? "bg-green-500 text-white"
            : "bg-red-500 text-white"
        }`}
      >
        <p className="text-sm">{message}</p>
        <button className="ml-4 text-lg font-semibold" onClick={onClose}>
          &times;
        </button>
      </div>
    )
  );
};

export default Toast;
