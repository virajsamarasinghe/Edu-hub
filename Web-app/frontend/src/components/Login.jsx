import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { studentId, password } = data;

    try {
      const response = await axios.post("http://192.168.8.142:5001/login", {
        studentId,
        password,
      });

      console.log("Login successful:", response.data);
      
      // Store user data in local storage
      localStorage.setItem("userId", studentId);

      const userDataResponse = await axios.get("http://192.168.8.142:5001/get-user-data", {
        params: { studentId },
      });

      const { firstName, emailAddress, phone } = userDataResponse.data.data;

      // Store additional user data in local storage
      localStorage.setItem("firstName", firstName);
      localStorage.setItem("emailAddress", emailAddress);
      localStorage.setItem("phone", phone);
      localStorage.setItem("isLoggedIN", "true");

      // Navigate to home page
      navigate("/");
    } catch (error) {
      setErrorMessage("Failed to login. Please check your Student ID and Password.");
    }

    reset();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
    <div className="max-w-md  mx-auto my-20 bg-white shadow-lg rounded-lg p-9 justify-center ">
      <h3 className="text-2xl font-bold text-center">Hi!, Please Login</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* User Type Dropdown */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">User Type</span>
          </label>
          <select
            {...register("userType", { required: true })}
            className="input input-bordered w-full"
          >
            <option value="">Select User Type</option>
            <option value="1">Student</option>
            <option value="2">Tutor</option>
            <option value="3">Parent</option>
          </select>
          {errors.userType && <p className="text-red-500 text-sm">Please select your user type.</p>}
        </div>

        {/* Student ID */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Student ID</span>
          </label>
          <input
            type="text"
            placeholder="Enter your Student ID"
            {...register("studentId", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.studentId && <p className="text-red-500 text-sm">Student ID is required.</p>}
        </div>

        {/* Password */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.password && <p className="text-red-500 text-sm">Password is required.</p>}
        </div>

        {/* Error Message */}
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

        {/* Login Button */}
        <div className="form-control mt-4">
          <button type="submit" className="btn btn-primary w-full">Login</button>
        </div>
      </form>

      {/* Forgot Password */}
      <div className="text-center mt-4">
        <Link to="/forgot-password" className="text-sm text-blue-500">
          Forgot password?
        </Link>
      </div>

      {/* Signup Link */}
      <p className="text-center mt-4">
        Don’t have an account?
        <Link to="/signup" className="text-blue-500 ml-1">
          Signup Now
        </Link>
      </p>
      </div>
    </div>
  );
};

export default Login;
