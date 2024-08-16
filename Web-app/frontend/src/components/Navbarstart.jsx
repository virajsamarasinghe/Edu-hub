import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaRegUser } from 'react-icons/fa';
import SignupModal from './SignupModel';
import LoginModal from './LoginModel';
import logo from "/logo.png"; // Adjust the path to your logo

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false); // State to manage SignupModal open/close
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // State to manage LoginModal open/close
  const location = useLocation();

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
    setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop, location.pathname]);

  const handleOpenSignupModal = () => {
    setIsSignupModalOpen(true);
  };

  const handleCloseSignupModal = () => {
    setIsSignupModalOpen(false);
  };

  const handleOpenLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleRegister = (userData) => {
    // Handle user registration logic here
    console.log('User registered:', userData);
  };

  return (
    <header className={`max-w-screen-3xl container mx-auto fixed top-0 left-0 right-0 transition-all duration-300 ease-in-out`}>
      <div className={`navbar w-full xl:px-24 ${isSticky ? "shadow-md bg-base-100 transition-all duration-300 ease-in-out" : ""}`}>
        <div className="navbar-start">
          <a href="/">
            <img src={logo} alt="Logo" />
          </a>
        </div>
        <div className="navbar-end">
          <button
            onClick={handleOpenLoginModal}
            className="btn flex items-center gap-2 rounded-2xl px-6 text-black"
            style={{ backgroundColor: 'white', borderColor: 'black' }}
          >
            <FaRegUser /> Sign In
          </button>
          <LoginModal isOpen={isLoginModalOpen} onClose={handleCloseLoginModal} onRegister={handleRegister} />
          
          <button
            onClick={handleOpenSignupModal}
            className="btn flex items-center gap-2 rounded-2xl px-6 text-white ml-4"
            style={{ backgroundColor: '#8C78F0' }}
          >
            <FaRegUser /> Join now
          </button>
          <SignupModal isOpen={isSignupModalOpen} onClose={handleCloseSignupModal} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;