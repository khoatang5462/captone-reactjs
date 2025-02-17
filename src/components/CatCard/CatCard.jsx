import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './CatCard.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const CatCard = () => {
  const url = 'https://679eff4e946b0e23c06475b7.mockapi.io/cards';
  const [slides, setSlides] = useState([]);
  const sliderRef = useRef(null); 
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await axios.get(url);
        setSlides(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchSlides();
  }, []);

  return (
    <div className=' relative'>
      <Slider ref={sliderRef} {...settings} className='mx-20'>
        {slides.map(slide => (
          <div key={slide.id} className='catCard p-4'>
            <img src={slide.img} alt={slide.title} />
            <h2 className='title'>{slide.title}</h2>
            <p className='desc'>{slide.desc}</p>
          </div>
        ))}
      </Slider>
      <div>
        <button className=' absolute top-1/2 left-10 ' onClick={() => sliderRef.current.slickPrev()}> <i className="fa-solid fa-circle-chevron-left text-3xl"></i>  </button>
        <button className=' absolute top-1/2 right-10' onClick={() => sliderRef.current.slickNext()}> <i className="fa-solid fa-circle-chevron-right text-3xl"></i> </button>

      </div>
    </div>
  );
};