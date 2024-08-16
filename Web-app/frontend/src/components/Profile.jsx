import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

const Profile = ({ user }) => {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  // logout
  const handleLogout = () => {
    logOut()
      .then(() => {
      
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="dropdown">
        <div tabIndex={0} role="button">
          <div className="drawer-content">
            {/* Page content here */}
            <label
              htmlFor="my-drawer-4"
              className="drawer-button btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                {user && user.photoURL ? (
                  <img alt="User Avatar" src={user.photoURL} />
                ) : (
                  <img alt="Default Avatar" src="/images/avatar.jpg" />
                )}
              </div>
            </label>
          </div>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
        >
          <li>
            <a href="/update-profile">Profile</a>
          </li>
          <li>
            <a href="/order">Payment</a>
          </li>
          <li>
            <a>Settings</a>
          </li>
          <li>
            <a>
              <Link to="/dashboard">Dashboard</Link>
            </a>
          </li>
          <li>
            <a onClick={handleLogout}>Logout</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;