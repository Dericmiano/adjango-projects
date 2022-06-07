// import './Testimonials.css'
import {Carousel} from "react-bootstrap";
import React, {Component} from "react";
import images from "../constants/images";
import testimonials from "../testimonial";
export default class Testimonial extends Component {
  render() {
     {testimonials.map(testimonial=>(
                    <div key={testimonial._id}>
                        <Testimonial testimonial={testimonial}/>
                    </div>
                ))}
    return (
        <div className='test1'>
                <h2  className='head-text'>How clients say about us</h2>
             <Carousel
        showArrows={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        autoPlay={true}
        interval={6100}
      >
        <div>
          <img className='img1' src={images.person}  alt='si'/>
          <div className="myCarousel">
            <h3>Shirley Fultz</h3>
            <h4>Designer</h4>
            <p>
              It's freeing to be able to catch up on customized news and not be
              distracted by a social media element on the same site
            </p>
          </div>
        </div>

      </Carousel>
        </div>


    );
  }
}