import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "/logo.png";
import { FaRegUser } from "react-icons/fa";
import Modal from "./Modal";
import Profile from "./Profile";
import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const [isSticky, setSticky] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const { user } = useAuth();
  const [cart] = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.scrollY;
      if (currentScrollTop > lastScrollTop) {
        // Scrolling down
        setShowSearchInput(false);
      } else {
        // Scrolling up
        if (location.pathname === "/menu") {
          setShowSearchInput(true);
        }
      }
      setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop); // For Mobile or negative scrolling
      setSticky(currentScrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop, location.pathname]);

  const handleSearchClick = () => {
    if (location.pathname !== "/menu") {
      navigate("/menu"); // Redirect to /menu page
    }
    setShowSearchInput(true); // Show search input when navigating
  };

  useEffect(() => {
    if (location.pathname !== "/menu") {
      setShowSearchInput(false); // Hide search input if not on /menu page
    }
  }, [location.pathname]);

  const navItems = (
    <>
      <li>
        <a href="/" className="text-pink">
          Home
        </a>
      </li>
      <li>
        <a href="/blog">Schedule</a>
      </li>

      <li>
        <a href="/cart-page">Class Fee</a>
      </li>
      <li tabIndex={0}>
        <details>
          <summary>Menu</summary>
          <ul className="p-2">
            <li>
              <a href="/menu">Quize</a>
            </li>
            <li>
              <a href="/menu">Resources</a>
            </li>
            <li>
              <a href="/menu">Progress</a>
            </li>
            <li>
              <a href="/menu">Chat</a>
            </li>
           
          </ul>
        </details>
      </li>
      
      
    </>
  );

  return (
    <header className={`max-w-screen-3xl container mx-auto fixed top-0 left-0 right-0 transition-all duration-300 ease-in-out`}>
      <div className={`navbar w-full xl:px-24 ${isSticky ? "shadow-md bg-base-100 transition-all duration-300 ease-in-out" : ""}`}>
        <div className="navbar-start">
          <div className="dropdown justify-between">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-64 space-y-3"
            >
              {navItems}
            </ul>
          </div>
          <a href="/">
            
            <img src={logo} alt="Logo" />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>
        <div className="navbar-end">
         
          {/* Conditionally render search input only on /menu page */}
          {showSearchInput && location.pathname === "/menu" && (
            <input
              type="text"
              placeholder="Search..."
              className="input input-bordered w-full max-w-xs"
            />
          )}
          {/* shopping cart */}
          
          <Link to="/cart-page">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle lg:flex items-center justify-center mr-3"
              
            >
              <div className="indicator" >
              <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
                <span className="badge badge-sm indicator-item bg-red text-white">
                  {cart.length || 0}
                </span>
              </div>
            </label>
          </Link>
         
          <button
  className="btn btn-ghost btn-circle hidden lg:flex" 
  style={{ marginLeft: '-15px' }}
  onClick={handleSearchClick} // Use handleSearchClick to navigate and optionally show input
>
  <div className="relative">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 1.1-.9 2-2 2H7l-4 4V4c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v8z"
      />
    </svg>
    <span className="badge badge-sm indicator-item bg-red text-white absolute bottom-3 left-2">
      {cart.length || 0}
    </span>
  </div>
</button>
          {/* login button */}
          {user ? (
            <>
              <Profile user={user} />
            </>
          ) : (
            <button
              onClick={() => document.getElementById('my_modal_5').showModal()}
              className="btn flex items-center gap-2 rounded-full px-6 bg-pink text-white"
            >
              <FaRegUser /> Login
            </button>
          )}
          <Modal />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
