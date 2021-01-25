import React from 'react';
import { HashLink } from 'react-router-hash-link';
import { Link } from 'react-router-dom';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';
// <h1>Welcome to </h1>
// <h1>AMC- IIT BHU Varanasi</h1>
function HeroSection() {
  return (
    <div className='hero-container' id='hero'>
      <video src='/videos/video-4.mp4' autoPlay loop muted />
      <h1  class="animate__animated animate__bounce">Welcome to </h1>
      <h2 className="maintitle">Aero-Modelling Club,</h2>
      <h2> IIT-(BHU)</h2>
      <p>Where Sky is never the Limit</p>
      <div className='hero-btns'>
        <HashLink to="/#aboutus">
          <Button
            className='btns'
            buttonStyle='btn--outline'
            buttonSize='btn--large'
          >
            GET STARTED
          </Button>
        </HashLink>
        <a target="_blank" href="https://www.youtube.com/watch?v=oN_T_YsRQQA">
          <Button
            className='btns'
            buttonStyle='btn--primary'
            buttonSize='btn--large'
            onClick={console.log('hey')}
          >
            WATCH TRAILER <i className='far fa-play-circle' />
          </Button>
        </a>
      </div>
    </div>
  );
}

export default HeroSection;
