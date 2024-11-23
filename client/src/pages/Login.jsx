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

  // Separate useForm instances
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm();

  const {
    register: resetRegister,
    handleSubmit: handleResetSubmit,
    reset: resetForm, // For clearing the form after submission
    formState: { errors: resetErrors },
  } = useForm();

  const token = localStorage.getItem("userinfo");

  // Redirect to home if already logged in
  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate]);

  // Login handler
  const handleLogin = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/api/v1/login", data);
      if (response.status === 200) {
        localStorage.setItem("userinfo", JSON.stringify(response.data.user));
        toast.success("Login Successfully");
        setTimeout(() => navigate("/"), 1000);
      }
    } catch (error) {
      const errorMessage = error.response?.status === 401 ? "Invalid Credentials" : "An error occurred";
      toast.error(errorMessage);
    }
  };

  // Password reset handler
  const handlePasswordReset = async (data) => {
    try {
      const { email, password } = data;
      const response = await axios.post("http://localhost:5000/api/v1/resetPassword", { email, newPassword: password });
      if (response.status === 200) {
        toast.success("Password reset successful");
        setModalOpen(false);
        resetForm(); // Clear the reset form after successful reset
      }
    } catch (error) {
      toast.error("Failed to reset password");
    }
  };

  return (
    <div className="bg-gradient-to-r from-orange-400 via-yellow-500 to-orange-600 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-center font-bold text-3xl text-gray-800 mb-6">Login</h1>
        <form onSubmit={handleLoginSubmit(handleLogin)} className="flex flex-col gap-6">
          <InputField id="email" type="email" label="Your Email" placeholder="name@gmail.com" register={loginRegister("email", { required: "Email is required" })} error={loginErrors.email} />
          <InputField id="password" type="password" label="Your Password" register={loginRegister("password", { required: "Password is required" })} error={loginErrors.password} />
          <div className="flex justify-between items-center">
            <span onClick={() => setModalOpen(true)} className="text-orange-500 font-semibold hover:text-orange-600 cursor-pointer">
              Forgot Password?
            </span>
            <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
              Login
            </button>
          </div>
          <div className="text-center">
            Not a member?{" "}
            <Link to="/register" className="text-orange-500">
              Register
            </Link>
          </div>
        </form>
      </div>

      {/* Reset Password Modal */}
      <PasswordResetModal isModalOpen={isModalOpen} setModalOpen={setModalOpen} handlePasswordReset={handleResetSubmit(handlePasswordReset)} register={resetRegister} errors={resetErrors} />
    </div>
  );
}

// Reusable Input Field Component
const InputField = ({ id, type, label, placeholder, register, error }) => (
  <div>
    <Label htmlFor={id} value={label} className="text-gray-600 font-semibold" />
    <TextInput id={id} name={id} type={type} placeholder={placeholder} className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500" {...register} />
    {error && <p className="text-red-500 text-sm">{error.message}</p>}
  </div>
);

// Password Reset Modal Component
const PasswordResetModal = ({ isModalOpen, setModalOpen, handlePasswordReset, register, errors }) => (
  <Modal isOpen={isModalOpen} onRequestClose={() => setModalOpen(false)} contentLabel="Reset Password" className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg mx-auto" overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
    <h2 className="text-center font-bold text-2xl text-gray-800 mb-6">Reset Password</h2>
    <form onSubmit={handlePasswordReset} className="flex flex-col gap-6">
      <InputField id="reset-email" type="email" label="Email" placeholder="Enter your email" register={register("email", { required: "Email is required" })} error={errors.email} />
      <InputField id="new-password" type="password" label="New Password" register={register("password", { required: "Password is required" })} error={errors.password} />
      <InputField id="confirm-password" type="password" label="Confirm Password" register={register("confirmPassword", { required: "Confirm Password is required" })} error={errors.confirmPassword} />
      <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
        Reset Password
      </button>
    </form>
  </Modal>
);

export default Login;
