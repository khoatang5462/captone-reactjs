import React from 'react';
import { useNavigate } from "react-router-dom";
import { Banner, TrustedBy, CatCard, Features, Testimonial, Explore } from '../../components';


import "./HomePage.scss";
import { fromJSON } from 'postcss';

export const HomePage = () => {

  return (
    <div className='homePage'>
      <Banner />
      <TrustedBy />
      <CatCard />
      <Features>

        <Testimonial />
        <Explore/>
      </Features>



    </div>
  );
};