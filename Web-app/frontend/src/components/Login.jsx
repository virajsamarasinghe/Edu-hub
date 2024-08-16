// import React, { useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
// import { useForm } from "react-hook-form";
// import useAuth from "../hooks/useAuth";
// import useAxiosPublic from "../hooks/useAxiosPublic";

// const Login = () => {
//   const [errorMessage, setErrorMessage] = useState("");
//   const { signUpWithGmail, login } = useAuth();
//   const axiosPublic = useAxiosPublic();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const from = location.state?.from?.pathname || "/";

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = (data) => {
//     const email = data.email;
//     const password = data.password;
//     login(email, password)
//       .then((result) => {
//         const user = result.user;
//         const userInfor = {
//           name: data.name,
//           email: data.email,
//         };
//         axiosPublic.post("/users", userInfor).then((response) => {
//           alert("Signin successful!");
//           navigate(from, { replace: true });
//         });
//       })
//       .catch((error) => {
//         setErrorMessage("Please provide valid email & password!");
//       });
//     reset();
//   };

//   const handleRegister = () => {
//     signUpWithGmail()
//       .then((result) => {
//         const user = result.user;
//         const userInfor = {
//           name: result.user.displayName,
//           email: result.user.email,
//         };
//         axiosPublic.post("/users", userInfor).then((response) => {
//           alert("Signin successful!");
//           navigate("/");
//         });
//       })
//       .catch((error) => console.log(error));
//   };

//   return (
//     <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
//       <div className="mb-5">
//         <form className="card-body" method="dialog" onSubmit={handleSubmit(onSubmit)}>
//           <h3 className="font-bold text-lg">Please Login!</h3>

//           {/* email */}
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Email</span>
//             </label>
//             <input
//               type="email"
//               placeholder="email"
//               className="input input-bordered"
//               {...register("email")}
//             />
//           </div>

//           {/* password */}
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Password</span>
//             </label>
//             <input
//               type="password"
//               placeholder="password"
//               className="input input-bordered"
//               {...register("password", { required: true })}
//             />
//             <label className="label">
//               <a href="#" className="label-text-alt link link-hover mt-2">
//                 Forgot password?
//               </a>
//             </label>
//           </div>

//           {/* show errors */}
//           {errorMessage && (
//             <p className="text-red text-xs italic">
//               Provide a correct username & password.
//             </p>
//           )}

//           {/* submit btn */}
//           <div className="form-control mt-4">
//             <input type="submit" className="btn bg-pink text-white" value="Login" />
//           </div>

//           {/* close btn */}
//           <Link to="/">
//             <div className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 bg-pink">
//               ✕
//             </div>
//           </Link>

//           <p className="text-center my-2">
//             Don’t have an account?
//             <Link to="/signup" className="underline text-red ml-1">
//               Signup Now
//             </Link>
//           </p>
//         </form>

//         <div className="text-center space-x-3">
//           <button onClick={handleRegister} className="btn btn-circle hover:bg-pink hover:text-white">
//             <FaGoogle />
//           </button>
//           <button className="btn btn-circle hover:bg-pink hover:text-white">
//             <FaFacebookF />
//           </button>
//           <button className="btn btn-circle hover:bg-pink hover:text-white">
//             <FaGithub />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
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
      const response = await axios.post("http://192.168.8.144:5001/login", {
        studentId,
        password,
      });

      console.log("Login successful:", response.data);
      
      // Store user data in local storage
      localStorage.setItem("userId", studentId);

      const userDataResponse = await axios.get("http://192.168.8.144:5001/get-user-data", {
        params: { studentId },
      });

      const { firstName, emailAddress, phone } = userDataResponse.data.data;

      // Store additional user data in local storage
      localStorage.setItem("firstName", firstName);
      localStorage.setItem("emailAddress", emailAddress);
      localStorage.setItem("phone", phone);
      localStorage.setItem("isLoggedIN", "true");

      // Navigate to home page
      navigate("/home");
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
        <div className="form-control mt-4" >
          <button type="submit" className="btn  w-full" style={{ backgroundColor: '#8C78F0' }}>Login</button>
        </div>
      </form>

      {/* Forgot Password */}
      <div className="text-center mt-4">
        <Link to="/forgotpassword" className="text-sm text-blue-500">
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