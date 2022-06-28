import React from 'react';
import CodepathLogo from '../../../CodepathLogo.svg';
import { NavLink } from 'react-router-dom';

const Logo = () => {
  return (
    <div>
      <NavLink to="/">
        <img src={CodepathLogo} />
      </NavLink>
    </div>
  );
};

export default Logo;
