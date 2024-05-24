import React from 'react'
import ListItems from '../components/ListItems'

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Slider from "react-slick";


const Home = () => {
   

    const settings = {
        dots: true,
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinity: true,
        autoplay: true,
        autoplaySpeed: 2000,
        adaptiveHeight: true,
        drag: true,
       };

  return (
    <>
 

    <section class="carousal-section">
    <Slider {...settings}>

    <div class="slide first-slide">
        <div class="slide-content">
            <span>Welcome to</span>
            <h2>TechAppMart</h2>
            {/* <a href="#" class="slide-btn">LOOK Categories</a> */}
        </div>
    </div>
    <div class="slide second-slide">
        <div class="slide-content">
            <span>Welcome to</span>
            <h2>TechAppMart</h2>
            {/* <a href="#" class="slide-btn">LOOK Categories</a> */}
        </div>
    </div>
    <div class="slide third-slide">
        <div class="slide-content">
            <span>Welcome to</span>
            <h2>TechAppMart</h2>
            {/* <a href="#" class="slide-btn">LOOK Categories</a> */}
        </div>
    </div>

</Slider>

</section>


      <ListItems/>
    </>
  )
}

export default Home