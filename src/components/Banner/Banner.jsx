import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';

export const Banner = () => {
  const navigate = useNavigate();
  
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, 
    autoplaySpeed: 3000,
  };

  const slides = [
    { image: "https://demo5.cybersoft.edu.vn/img/1.png", alt: "First Slide" },
    { image: "https://demo5.cybersoft.edu.vn/img/2.png", alt: "Second Slide" },
    { image: "https://demo5.cybersoft.edu.vn/img/3.png", alt: "Third Slide" },
    { image: "https://demo5.cybersoft.edu.vn/img/4.png", alt: "Fourth Slide" },
    { image: "https://demo5.cybersoft.edu.vn/img/5.png", alt: "Fifth Slide" },
  ];

  const btn = {
    border: '1px solid #fff',
    borderRadius: '40px',
    padding: '0 12px',
    whiteSpace: 'nowrap',
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = e.target.search.value;
    navigate(`/joblist/${searchTerm}`);
  };

  return (
    <div className='overflow-x-clip h-[100vh]'>
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative w-full">
            <div className='h-[100vh]' style={{ backgroundImage: `url(${slide.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
          </div>
        ))}
      </Slider>
      <div className="absolute top-1/2 left-20 translate-y-[-30%] flex flex-col justify-center gap-6">
        <h1 className="text-white text-5xl font-semibold leading-tight">
          Find the perfect <br /> <samp className='mr-3 italic'>freelance</samp>
          services for <br />your business
        </h1>
        <div className=''>
          <form onSubmit={handleSearch}>
            <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input type="search" id="search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500" placeholder="Search" required />
              <button type="submit" className="text-white font-Montserrat absolute end-0 bottom-0 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-semibold text-sm px-5 py-[17px]">Search</button>
            </div>
          </form>
        </div>
        <div className='font-Montserrat text-white text-sm font-bold flex justify-between gap-2'>
          <h4 className=''>Popular:</h4>
          <ul className="flex gap-2">
            <li><button style={btn}>Website Design</button></li>
            <li><button style={btn}>WordPress</button></li>
            <li><button style={btn}>Logo Design</button></li>
            <li><button style={btn}>Video Editing</button></li>
          </ul>
        </div>
      </div>
    </div>
  );
};
