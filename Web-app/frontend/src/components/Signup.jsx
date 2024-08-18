import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";


const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);
  const navigate = useNavigate();
  const axios = useAxiosPublic();

  const onSubmit = async (data) => {
    const { firstName, lastName, emailAddress, password, confirmPassword, userType } = data;

    if (!userType) {
      alert('Please select your user type (Student, Tutor, or Parent)');
      return;
    }

    if (!emailAddress || !password || !confirmPassword || !firstName || !lastName) {
      alert('Please fill in all required fields');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('http://192.168.8.144:5001/register', {
        firstName,
        lastName,
        emailAddress,
        password,
        userType
      });
      setLoading(false);
      console.log('Registration successful:', response.data);
      alert('Registration successful! Please check your email for verification.');
      setPendingVerification(true);
      navigate('/verify', { state: { email: emailAddress } });
    } catch (error) {
      setLoading(false);
      alert('Failed to register. Please try again.');
    }
  };

  const handleDropdownChange = (event) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedOption = event.target.options[selectedIndex];
    const selectedItem = {
      label: selectedOption.text,
      value: selectedOption.value
    };

    if (selectedItem.value === '2') {
      navigate('signupP');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
      <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20 rounded-3xl">
        <div className="mb-5">
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="font-bold text-3xl">Hi!, Please Signup</h3>
            <div className="form-control">
              <label className="label">
                <span className="label-text">User Type</span>
              </label>
              <select
                {...register("userType", { required: true })}
                className="input input-bordered w-full"
                onChange={handleDropdownChange}
              >
                <option value="">Select User Type</option>
                <option value="1">Student</option>
                <option value="2">Tutor</option>
                <option value="3">Parent</option>
              </select>
              {errors.userType && <p className="text-red-500 text-sm">Please select your user type.</p>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="text"
                placeholder="Your name"
                {...register("firstName", { required: true })}
                className="input input-bordered w-full"
              />
              {errors.firstName && <p className="text-red-500 text-sm">First name is required.</p>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                type="text"
                placeholder="Your last name"
                {...register("lastName", { required: true })}
                className="input input-bordered w-full"
              />
              {errors.lastName && <p className="text-red-500 text-sm">Last name is required.</p>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email Address</span>
              </label>
              <input
                type="email"
                placeholder="Your email address"
                {...register("emailAddress", { required: true })}
                className="input input-bordered w-full"
              />
              {errors.emailAddress && <p className="text-red-500 text-sm">Email address is required.</p>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Your password"
                {...register("password", { required: true })}
                className="input input-bordered w-full"
              />
              {errors.password && <p className="text-red-500 text-sm">Password is required.</p>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="Confirm your password"
                {...register("confirmPassword", { required: true })}
                className="input input-bordered w-full"
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm">Confirm password is required.</p>}
            </div>

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Signing up...' : 'Signup'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;