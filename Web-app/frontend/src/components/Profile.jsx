import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

const Profile = ({ user }) => {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate()

  // logout
  const handleLogout = () => {
    logOut()
      .then(() => {
        // Sign-out successful.
        navigate("/")
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    // <div>
    //   <div className="drawer drawer-end z-50">
    //     <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
    //     <div className="drawer-content">
    //       {/* Page content here */}
    //       <label
    //         htmlFor="my-drawer-4"
    //         className="drawer-button btn btn-ghost btn-circle avatar"
    //       >
    //         <div className="w-10 rounded-full">
    //         {user.photoURL ? (
    //             <img alt="User Avatar" src={user.photoURL} />
    //           ) : (
    //             <img alt="Default Avatar" src="/images/avatar.jpg" />
    //           )}
              
    //         </div>
    //       </label>
    //     </div>
    //     <div className="drawer-side">
    //       <label
    //         htmlFor="my-drawer-4"
    //         aria-label="close sidebar"
    //         className="drawer-overlay"
    //       ></label>
    //       <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
    //         {/* Sidebar content here */}
    //         <li>
    //           <a href="/update-profile">Profile</a>
    //         </li>
    //         <li>
    //           <a href="/order">Order</a>
    //         </li>
    //         <li>
    //           <a>Settings</a>
    //         </li>
    //         <li>
    //           <Link to="/dashboard">Dashboard</Link>
    //         </li>
    //         <li>
    //           <a onClick={handleLogout}>Logout</a>
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    // </div>
    <div> <div className="dropdown">
    <div tabIndex={0} role="button" >  <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-4"
            className="drawer-button btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
            {user.photoURL ? (
                <img alt="User Avatar" src={user.photoURL} />
              ) : (
                <img alt="Default Avatar" src="/images/avatar.jpg" />
              )}
              
            </div>
          </label>
        </div></div>
    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
      <li><a href="/update-profile">Profile</a></li>
      <li><a href="/order">Payment</a></li>
      <li><a>Settings</a></li>
      <li><a><Link to="/dashboard">Dashboard</Link></a></li>
      <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
    </ul>
  </div>
  </div>
  );
};

export default Profile;