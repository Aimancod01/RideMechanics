import React, { useEffect, useState } from "react";
import axios from "axios";
import { Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "react-modal";

function Login() {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const token = localStorage.getItem("userinfo");

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/api/v1/login", data);
      if (response.status === 200) {
        localStorage.setItem("userinfo", JSON.stringify(response.data.user));
        toast.success("Login Successfully");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Invalid Credentials");
      } else {
        console.error("Error:", error.message);
        toast.error("An error occurred");
      }
    }
  };

  const handlePasswordReset = async (data) => {
    try {
      const params = {
        email: data.email,
        newPassword: data.password,
      };
      const response = await axios.post("http://localhost:5000/api/v1/resetPassword", params);
      if (response.status === 200) {
        toast.success("Password reset successful");
        setModalOpen(false);
      }
    } catch (error) {
      toast.error("Failed to reset password");
    }
  };

  return (
    <div className="bg-gradient-to-r from-orange-400 via-yellow-500 to-orange-600 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-center font-bold text-3xl text-gray-800 mb-6">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div>
            <Label htmlFor="email" value="Your email" className="text-gray-600 font-semibold" />
            <TextInput id="email" name="email" type="email" placeholder="name@gmail.com" className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500" {...register("email", { required: "Email is required" })} />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <Label htmlFor="password" value="Your password" className="text-gray-600 font-semibold" />
            <TextInput id="password" name="password" type="password" className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500" {...register("password", { required: "Password is required" })} />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              <span onClick={() => setModalOpen(true)} className="text-orange-500 font-semibold hover:text-orange-600 cursor-pointer">
                Forgot Password?
              </span>
            </div>
            <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
              Login
            </button>
          </div>
          <div className="text-center">
            Not a member?{" "}
            <span className="text-orange-500">
              <Link to="/register">Resgister</Link>
            </span>
          </div>
        </form>
      </div>

      <Modal isOpen={isModalOpen} onRequestClose={() => setModalOpen(false)} contentLabel="Reset Password" className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg mx-auto" overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
        <h2 className="text-center font-bold text-2xl text-gray-800 mb-6">Reset Password</h2>
        <form onSubmit={handleSubmit(handlePasswordReset)} className="flex flex-col gap-6">
          <div>
            <Label htmlFor="reset-email" value="Email" className="text-gray-600 font-semibold" />
            <TextInput id="reset-email" name="email" type="email" placeholder="Enter your email" className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500" {...register("email", { required: "Email is required" })} />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <Label htmlFor="new-password" value="New Password" className="text-gray-600 font-semibold" />
            <TextInput id="new-password" name="password" type="password" className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500" {...register("password", { required: "Password is required" })} />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <div>
            <Label htmlFor="confirm-password" value="Confirm Password" className="text-gray-600 font-semibold" />
            <TextInput id="confirm-password" name="confirmPassword" type="password" className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500" {...register("confirmPassword", { required: "Confirm Password is required" })} />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
          </div>

          <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
            Reset Password
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default Login;
