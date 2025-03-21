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
            <div className=' space-x-4'>
              <Link to='/jobs/1'>Graphics & Design</Link>
              <Link to='/jobs/2'>Digital Marketing</Link>
              <Link to='/jobs/3'>Writing & Translation</Link>
              <Link to='/jobs/4'>Video & Animation</Link>
              <Link to='/jobs/5'>Music & Audio</Link>
              <Link to='/jobs/6'>Programming & Tech</Link>
              <Link to='/jobs/7'>Business</Link>
              <Link to='/jobs/8'>Lifestyle</Link>
              <Link to='/jobs/9'>Trending</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
