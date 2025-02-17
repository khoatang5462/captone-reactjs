import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FiverrLogo from './FiverrLogo';
import './Header.scss';

export const Header = () => {
  const [active, setActive] = useState(false);
  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  return (
    <div className='header'>
      <div className={active ? "navbar active" : "navbar"}>
        <div className='container'>
          <div className='logo'>
            {
              active ? 
                <FiverrLogo fillColor="#111" /> : 
                <Link to="/"><FiverrLogo fillColor="#fff" /></Link>
            }                        
          </div>
          <div className="links">
            <span><Link to={""}>Fiverr Business</Link></span>
            <span><Link to={""}>Explore</Link></span>
            <span><Link to={""}>English</Link></span>
            <span><Link to={""}>Become a Seller</Link></span>
            <span><Link to="/login">Sign In</Link></span>
            <span className='btn'><Link to="/register">Join</Link></span>
          </div>
        </div>
    
        {active && (
          <>
          <hr />
            <div>
              <span>Graphics & Design</span>
              <span>Digital Marketing</span>
              <span>Writing & Translation</span>
              <span>Video & Animation</span>
              <span>Music & Audio</span>
              <span>Programming & Tech</span>
              <span>Business</span>
              <span>Lifestyle</span>
              <span>Trending</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
