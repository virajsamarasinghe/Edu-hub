import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";
import k from "../assets/k.jpg"; // Import the image
import Test from "./test";
import SignupModal from './SignupModel';

const Banner = () => {
  const [isSignupModalOpen, setSignupModalOpen] = useState(false);

  const handleSignupClick = () => {
    setSignupModalOpen(true);
  };

  const handleCloseModal = () => {
    setSignupModalOpen(false);
  };

  return (
    <div>
    <div className='section-container bg-white relative w-full h-screen rounded-2xl' style={{ maxWidth: 'auto', margin: '0 auto' }}>
      <div className='py-24 flex flex-col md:flex-row justify-between items-start gap-8 relative'>
        
        {/* Text */}
        <div className='md:w-1/2 space-y-7 top-110 left-0 px-4 z-40'>
          <h2 className='md:text-7xl text-6xl font-bold md:leading-snug leading-snug'>
            Join upcoming <br />class next to <br />your door   
          </h2>
          <p className='text-xl text-[#4a4a4a]'>
            IVEPS integrates virtual classrooms, personalized pathways, AI-driven progress tracking, and optimizes learning outcomes.
          </p>

          <button
            onClick={handleSignupClick}
            className="btn flex items-center gap-2 rounded-2xl px-10 text-white mt-4" // Added mt-4 for margin-top
            style={{ backgroundColor: '#8C78F0', boxShadow: '0 40px 82px #8C78F0' }}
          >
            Join now <FaRegUser />
          </button>
        </div> 
        
        <div className='absolute top-40 left-20 w-full h-full flex items-center justify-center'>
          <div className='relative'>
            <div className='w-96 h-96 rounded-full absolute bottom-0 left-20' style={{ boxShadow: '0 14px 18px #8C78F0', backgroundImage: `url(${k})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            <div className='w-14 h-14 rounded-full absolute bottom-8 left-20' style={{ borderRadius: '60%', border: '3.5px solid #FFFFFF', boxShadow: '0 4px 8px #8C78F0', backgroundImage: `url(${k})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            <div className='w-14 h-14 rounded-full absolute bottom-40 left-20' style={{ borderRadius: '60%', border: '3.5px solid #FFFFFF', boxShadow: '0 4px 8px #8C78F0', backgroundImage: `url(${k})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            <div className='w-14 h-14 rounded-full absolute bottom-60 left-20' style={{ borderRadius: '60%', border: '3.5px solid #FFFFFF', boxShadow: '0 4px 8px #8C78F0', backgroundImage: `url(${k})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
          </div>
        </div>
        
      </div>
      <div className="move-up" style={{ marginTop: '-35px' }}><Test/></div>
    </div>
    {isSignupModalOpen && (
      <div className="fixed inset-0 z-50">
        <SignupModal isOpen={isSignupModalOpen} onClose={handleCloseModal} />
      </div>
    )}
  </div>
  );
};

export default Banner;