import { useForm } from "react-hook-form";
import { Label, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";

function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const userType = watch("userType");
  const token = localStorage.getItem("userinfo");

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/api/v1/register", data);
      toast.success("User Created Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setTimeout(() => {
        navigate("/login");
      }, 500);

      console.log("Response:", response.data); // Handle successful response as needed
    } catch (error) {
      if (error.response) {
        console.error("Response error:", error.response.data.msg);
        toast.error(`Error: ${error.response.data.msg}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else if (error.request) {
        console.error("Request error:", error.request);
        toast.error("No response received from the server. Please try again later.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        console.error("Error:", error.message);
        toast.error(`An unexpected error occurred: ${error.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    }
  };

  return (
    <div className="bg-gradient-to-r py-12 from-orange-400 via-yellow-500 to-orange-600 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-center font-bold text-3xl text-gray-800 mb-6">Register</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div>
            <Label htmlFor="name" value="Your name" className="text-gray-600 font-semibold" />
            <TextInput id="name" name="name" type="text" placeholder="name" className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500" {...register("name", { required: "Name is required" })} />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <Label htmlFor="email" value="Your email" className="text-gray-600 font-semibold" />
            <TextInput
              id="email"
              name="email"
              type="email"
              placeholder="name@gmail.com"
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <Label htmlFor="password" value="Your password" className="text-gray-600 font-semibold" />
            <TextInput
              id="password"
              name="password"
              type="password"
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <div>
            <Label htmlFor="userType" value="Type" className="text-gray-600 font-semibold" />
            <select disabled id="userType" name="userType" className="mt-2 p-3 w-full border bg-gray-200 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2" {...register("userType", { required: "User type is required" })}>
              <option value="" disabled selected>
                Select a user type
              </option>
              <option value="user">User</option>
            </select>
            {errors.userType && <p className="text-red-500 text-sm">{errors.userType.message}</p>}
          </div>

          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Already a Member?{" "}
              <Link to="/login" className="text-orange-500 font-semibold hover:text-orange-600">
                Login
              </Link>
            </p>
            <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
