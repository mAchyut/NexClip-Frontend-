import React from "react";
import authService from "../../backend/auth.js";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice.js";

function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = function () {
    const logoutStatus = authService.logout();
    if (logoutStatus) {
      dispatch(logout());
    }
  };
  return (
    <button
      className="w-auto p-2 bg-transparent border border-gray-700 text-gray-300 hover:bg-gray-700 rounded-lg"
      onClick={() => logoutHandler()}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
