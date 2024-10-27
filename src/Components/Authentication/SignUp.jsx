import React, { useState } from "react";
import authService from "../../backend/auth.js";
import { Input, Button } from "../CustomComponent/custom.js";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice.js";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaUser,
  FaLock,
  FaImage,
  FaCamera,
  FaUserLock,
} from "react-icons/fa"; // Icons
import Logo from "../../Logo/NexClip.png";

function SignUp() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (data) => {
    setError("");
    setLoading(true);
    try {
      if (data) {
        const { email } = data;
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!isEmail) {
          throw new Error("Please enter a valid email address");
        }
        if (data?.password !== data["confirm-password"]) {
          throw new Error("Password does not match");
        }
        const registered = await authService.registerUser({
          email: data.email,
          username: data.username,
          fullName: data.fullName,
          password: data.password,
          avatar: data.avatar[0],
          coverImage: data.coverImage[0],
        });
        if (registered) {
          dispatch(login(registered?.data));
          navigate("/");
        }
      }
    } catch (error) {
      if (error?.message?.includes("unlink")) {
        setError("Please choose files with different names for clarity");
      } else {
        setError(error?.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white select-none ">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg relative">
        <div className="absolute top-0">
          <img src={Logo} width={88} alt="Logo/image" draggable={false} />
        </div>
        <h2 className="text-3xl text-gray-300 font-semibold mb-6 text-center">
          Sign Up
        </h2>
        <p className="text-center mb-4 text-gray-200">
          Already have an account?{" "}
          <Link className="hover:underline text-blue-500" to={"/login"}>
            Sign in
          </Link>
        </p>
        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}
        <form onSubmit={handleSubmit(handleSignup)} className="space-y-4">
          <div className="space-y-2">
            <Input
              label={
                <>
                  <FaEnvelope className="mr-2 text-3xl" />
                </>
              }
              placeholder="Email*"
              className="bg-gray-700 text-white w-full  p-2 rounded-md"
              {...register("email", { required: true })}
            />
            <Input
              label={
                <>
                  <FaUser className="mr-2 text-3xl" />
                </>
              }
              placeholder="Username*"
              className="bg-gray-700 text-white w-full  p-2 rounded-md"
              {...register("username", { required: true })}
            />
            <Input
              label={
                <>
                  <FaUser className="mr-2 text-3xl" />
                </>
              }
              placeholder="Full Name"
              className="bg-gray-700 text-white w-full  p-2 rounded-md"
              {...register("fullName")}
            />
            <Input
              label={
                <>
                  <FaLock className="mr-2 text-3xl" />
                </>
              }
              type="password"
              placeholder="Password*"
              className="bg-gray-700 text-white w-full  p-2 rounded-md"
              {...register("password", { required: true })}
            />
            <Input
              label={
                <>
                  <FaUserLock className="mr-2 text-3xl" />
                </>
              }
              type="password"
              placeholder="Confirm password*"
              className="bg-gray-700 text-white w-full  p-2 rounded-md"
              {...register("confirm-password", { required: true })}
            />
            <Input
              label={
                <>
                  <FaCamera className="mr-2 text-3xl" />
                </>
              }
              type="file"
              className="bg-gray-700 text-white w-full  p-1 rounded-md"
              {...register("avatar", { required: true })}
            />
            <Input
              label={
                <>
                  <FaImage className="mr-2 text-3xl" />
                </>
              }
              type="file"
              className="bg-gray-700 text-white w-full p-1 rounded-md"
              {...register("coverImage")}
            />
          </div>

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

export default SignUp;
