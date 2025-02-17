import React, { useEffect, useState, useRef } from "react"; 
import axios from "axios";
import "./Testmonial.scss";
import Slider from "react-slick";

export const Testimonial = () => {
    const [showVideoOverlay, setShowVideoOverlay] = useState(null);
    const [testimonial, setTestimonial] = useState([]);
    const sliderRef = useRef(null);
    
    const url = "https://679eff4e946b0e23c06475b7.mockapi.io/Testimonial";

    useEffect(() => {
        const fetchTest = async () => {
            try {
                const result = await axios.get(url);
                setTestimonial(result.data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
        fetchTest();
    }, []);

    const handleVideoClick = (id) => {
        setShowVideoOverlay(id);
    };

    const closeVideoOverlay = () => {
        setShowVideoOverlay(null);
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <div className="testmonial relative">
            <Slider ref={sliderRef} {...settings}>
                {testimonial.map((item) => (
                    <div key={item.id} className="testimonial-item">
                        <div className="container">
                            <div className="left">
                                <img src={item.img} alt={item.name} />
                                <button onClick={() => handleVideoClick(item.id)}>
                                    <i className="fa-solid fa-circle-play"></i>
                                </button>
                            </div>
                            <div className="right">
                                <div className="title">
                                    <h5>{item.name} | </h5>
                                    <span className="logo">
                                        <img src={item.logo} alt="" />
                                    </span>
                                </div>
                                <i className="review">"{item.testimonial}"</i>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>

            {/* Video Overlay */}
            {showVideoOverlay !== null && (
                <div className="overlay" onClick={closeVideoOverlay}>
                    <div className="video">
                        {testimonial.map(item => (
                            item.id === showVideoOverlay && item.videoUrl && (
                                <video key={item.id} src={item.videoUrl} controls autoPlay />
                            )
                        ))}
                    </div>
                </div>
            )}

            <div>
                <button className='absolute top-1/2 left-10' onClick={() => sliderRef.current.slickPrev()}>
                    <i className="fa-solid fa-circle-chevron-left text-3xl"></i>
                </button>
                <button className='absolute top-1/2 right-10' onClick={() => sliderRef.current.slickNext()}>
                    <i className="fa-solid fa-circle-chevron-right text-3xl"></i>
                </button>
            </div>
        </div>
    );
};