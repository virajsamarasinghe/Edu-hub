import React from 'react';
import Banner from '../../components/Banner';
import Categories from './Categories';
import SpecialRoles from './SpecialRoles';
import Testimonials from './Testimonials';
import OurServices from './OurServices';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Home = () => {
  return (
    <div >
      <Navbar />
      <Banner />
      <Categories />
      <SpecialRoles />
      <Testimonials />
      <OurServices />
      <Footer />
    </div>
  );
};

export default Home;