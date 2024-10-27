import React, { useState, useEffect } from "react";
import Input from "../CustomComponent/Input";
import Button from "../CustomComponent/Button";
import { useForm } from "react-hook-form";
import authService from "../../backend/auth";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../store/authSlice";
import { FaUnlock, FaUserAlt } from "react-icons/fa";
import Logo from "../../Logo/NexClip.png";

function Login() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const userData = useSelector((state) => state.auth.userData);

  // Log the userData when it changes
  useEffect(() => {
    if (userData) {
      console.log("Updated userData:", userData);
    }
  }, [userData]);

  const handleLogin = async (data) => {
    setError("");
    setLoading(true);
    try {
      if (data) {
        const { identifier, password } = data;
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
        const loginData = {
          [isEmail ? "email" : "username"]: identifier,
          password: password,
        };
        const loginUser = await authService.login(loginData);
        console.log(loginUser.data.data);
        if (loginUser) {
          dispatch(login(loginUser.data.data));
          // navigate("/");
        }
      }
    } catch (error) {
      setError(error?.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white  select-none">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg relative">
        <div className="absolute top-0">
          <img src={Logo} width={88} alt="Logo/image" draggable={false} />
        </div>
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-300">
          Login
        </h2>
        <p className="text-center mb-4 text-gray-200">
          Don&apos;t have an account?{" "}
          <Link className="hover:underline text-blue-500" to={"/signup"}>
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
          <Input
            label={
              <>
                <FaUserAlt className="mr-2 text-3xl" />
              </>
            }
            type="text"
            placeholder="Email/Username*"
            className="bg-gray-700 text-white w-full  p-2 rounded-md"
            {...register("identifier", { required: true })}
          />
          <Input
            label={
              <>
                <FaUnlock className="mr-2 text-3xl" />
              </>
            }
            type="password"
            placeholder="Password*"
            className="bg-gray-700 text-white w-full  p-2 rounded-md"
            {...register("password", { required: true })}
          />
          <div className="text-center">
            <Button
              type="submit"
              className="w-1/2 py-2 bg-gradient-to-r from-gray-600 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white font-bold rounded hover:rounded-full"
              disable={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
