import React, { useState } from "react";
import authService from "../../backend/auth.js";
import { useForm } from "react-hook-form";
import { Input, Button } from "../CustomComponent/custom.js";
import {
  FaAt,
  FaCheck,
  FaClipboardCheck,
  FaCloudversify,
  FaLock,
  FaUserEdit,
  FaUserLock,
  FaUserSecret,
} from "react-icons/fa";

function ChangePassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [alert, setAlert] = useState("");
  const { register, handleSubmit } = useForm();

  const handleUpdateDetails = async (data) => {
    setError("");
    setAlert("");
    try {
      if (data) {
        const { currentPassword, newPassword, confirmPassword } = data;
        setLoading(true);
        if (newPassword !== confirmPassword) {
          setError("Passwords do not match");
        } else {
          const success = await authService.changeCurrentPassword({
            currentPassword,
            newPassword,
          });
          if (success) {
            setAlert(success.data?.message);
          }
        }
      }
    } catch (error) {
      console.log(error);
      setError(error?.message);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setAlert("");
        setError("");
      }, 8000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Update Password</h2>
        <div className="text-center">
          {error && <p className="text-red-400">{error}</p>}
          {alert && <p className="text-green-300">{alert}</p>}
        </div>
        <form
          onSubmit={handleSubmit(handleUpdateDetails)}
          className="space-y-6"
        >
          <Input
            label={<FaUserLock className="text-2xl mr-2" />}
            placeholder="current password"
            className="bg-gray-700 text-white w-full  p-2 rounded-md"
            {...register("currentPassword")}
          />
          <Input
            label={<FaLock className="text-2xl mr-2" />}
            placeholder="new password"
            className="bg-gray-700 text-white w-full  p-2 rounded-md"
            {...register("newPassword")}
          />
          <Input
            label={<FaCheck className="text-2xl mr-2" />}
            placeholder="confirm password"
            className="bg-gray-700 text-white w-full  p-2 rounded-md"
            {...register("confirmPassword")}
          />
          <div className="text-center">
            <Button
              type="submit"
              className="w-1/2 py-2 bg-gradient-to-r from-gray-600 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white font-bold rounded hover:rounded-full"
              disable={loading}
            >
              {loading ? "Updating..." : "Update"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
