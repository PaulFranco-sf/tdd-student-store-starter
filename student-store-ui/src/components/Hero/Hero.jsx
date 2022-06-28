import React from 'react';
import './Hero.css';
import Icon from "../../student_store_icon.18e5d61a.svg"

function Hero(){
  return (
    <div className="hero">
      <div className="content">
        <div className="intro">
          <h1>Welcome! <br></br>
          Find Your Merch!</h1>
          <p>
            We have all kinds of goodies. Click on any of the items to start
            filling up your shopping cart. Checkout whenever you're ready.
          </p>
        </div>
        <div className="media">
          <img
            src={Icon}
            alt="hero"
            className="hero-img"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
