import React from 'react';

const BlogPage = () => {
  return (
    <div className='section-container bg-white relative w-full h-160' style={{ maxWidth: 'auto', margin: '0 auto' }}>
      <div className='py-24 flex flex-col md:flex-row justify-between items-start gap-8 relative'>
        
        {/* Text */}
        <div className='md:w-1/2 space-y-7 px-4 z-10'>
          <h2 className='md:text-5xl text-4xl font-bold md:leading-snug leading-snug'>
            Welcome to   
            <span className='text-pink'> Edu-Hub!</span>
          </h2>
          <p className='text-xl text-[#4a4a4a]'>
            IVEPS integrates virtual classrooms, personalized pathways, AI-driven progress tracking, and optimizes learning outcomes.
          </p>
        </div> 
        
      </div>
    </div>
  );
};

export default BlogPage;