import { useEffect, useState } from "react";
import "./App.css";
import Header from "./Components/Header.jsx";
// import Footer from "./Components/Footer.jsx";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "./backend/auth.js";
import { login, logout } from "./store/authSlice.js";
import LoadingIcon from "./Logo/Loading3.gif";

window.addEventListener("keydown", (e) => {
  // Disable specific key combinations
  if (
    (e.ctrlKey && e.shiftKey && e.key === "C") ||
    (e.ctrlKey && e.key === "U") ||
    e.key === "F12"
  ) {
    // F12 for opening dev tools
    e.preventDefault();
    alert("This action has been disabled.");
  }
});

// Disable context menu
window.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          console.log(userData.data?.data);
          dispatch(login(userData.data?.data));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (!loading) {
    return <Header Outlet={Outlet} />;
  } else {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-800">
        <img
          src={LoadingIcon}
          className="max-w-[4%]"
          draggable={false}
          alt="loading..."
        />
      </div>
    );
  }
}

export default App;
