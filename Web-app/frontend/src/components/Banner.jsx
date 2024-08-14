import Lottie from 'lottie-react';
import bannerImg2 from "../../public/animation/1.json";

const Banner = () => {
  return (
    <div className='section-container bg-white relative w-full h-160' style={{ maxWidth: 'auto', margin: '0 auto' }}> {/* Increased height */}
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
        
        {/* Image */}
        <div className='flex items-end h-full md:w-1/2 absolute right-0' style={{ bottom: '-255px', right: '-210px'}}> {/* Adjusted bottom position */}
          <Lottie animationData={bannerImg2} alt="Banner" className=" md:w-3/4 lg:w-5/6" />
        </div> 
        
      </div>
    </div>
  );
};

export default Banner;