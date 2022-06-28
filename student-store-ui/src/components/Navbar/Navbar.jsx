import * as React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './Navbar.css';

export default function Navbar({scrollAbout, scrollContact, scrollFooter}) {
  return (
    <nav className="navbar">
      <div className="navbar-contents">
        <Logo />
        <div><NavLink style={{textDecoration: "none", color: "white"}} to="/">Home</NavLink></div>
        <div className="content" onClick={scrollAbout}>About Us</div>
        <div className="content" onClick={scrollContact}>Contact Us</div>
        <div className="content" onClick={scrollFooter}>Buy Now</div>
      </div>
    </nav>
  );
}
