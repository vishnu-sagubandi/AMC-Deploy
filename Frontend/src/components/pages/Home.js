import React from 'react';
import '../../App.css';
import Cards from '../Cards';
import HeroSection from '../HeroSection';
import Footer from '../Footer';
import Achievements from '../Timeline'
import {UEvents} from '../UpcomingEvents';
// import {About} from '../About';


function Home() {
  return (
    <>
      <HeroSection />

      <UEvents />
      {/* <PEvents /> */}
      {/* <Cards /> */}
      <Achievements />
      <Footer />

    </>
  );
}

export default Home;
