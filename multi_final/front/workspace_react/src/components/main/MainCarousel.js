import React from 'react';
import './css/MainCarousel.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Carousel } from 'react-bootstrap';

const MainCarousel = () => {
    return (
        <div 
        style= {{ 
          justifyContent: 'center',
          margin: '0 auto',
          alignContent: 'center',
          display: 'block',
          width: 1440,
          paddingTop: 30,
          paddingBottom: 20
        }}
          id='cardImage'
          className='carousel'>
<Carousel fade>
  <Carousel.Item>
    <img
    className="d-flex"
      src='./assets/banner_test1.png'
      alt="First slide"
    />
  </Carousel.Item>
  <Carousel.Item>
    <img
    
    className="d-flex"
      src='./assets/banner_test2.png'
      alt="Second slide"
    />
  </Carousel.Item>
  <Carousel.Item>
    <img
    className="d-flex"
      src='./assets/banner_test3.png'
      alt="Third slide"
    />
  </Carousel.Item>
</Carousel>
        </div>
    );
};
export default MainCarousel;