import React from 'react';
import Banner from '../../components/Banner';
import Categories from './Categories';
import SpecialRoles from './SpecialRoles';
import Testimonials from './Testimonials';
import OurServices from './OurServices';

const Home = () => {
  return (
    <div >
      <Banner />
      <Categories />
      <SpecialRoles />
      <Testimonials />
      <OurServices />
    </div>
  );
};

export default Home;