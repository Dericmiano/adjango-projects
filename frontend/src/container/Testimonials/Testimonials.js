import React, {Component, useEffect} from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import './Testimonials.css'
import images from "../../constants/images";
// import testimonials from "../../testimonial";
import Testimonial from "../../components/Testimonial";
import testimonial from "../../testimonial";
import {useDispatch, useSelector} from "react-redux";
import {listTestimonials} from "../../actions/testimonialActions";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
function Testimonials() {

    const dispatch = useDispatch();
    const testimonialsList = useSelector(state => state.testimonialsList)
    const {error,loading,testimonials} = testimonialsList
     useEffect(()=>{
        dispatch(listTestimonials())
    }, [dispatch])
    return (
        <div>
           <div className='test1'>
           <h2  className='head-text'>How clients say about us</h2>
               <>
                    {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    :(
                         <Carousel
        showArrows={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        autoPlay={true}
        interval={6100}
      >
                {testimonials.map(testimonial=>(
                    <div key={testimonial._id}>

                        <img className='img1' src={testimonial.image}  alt='si'/>
                          <div className="myCarousel">
                            <h3>{testimonial.name}</h3>
                            <h4>{testimonial.company}</h4>
                            <p>
                                {testimonial.description}
                            </p>
                          </div>
                    </div>
                ))}

      </Carousel>

                            )
                    }
               </>

        </div>


        </div>



    );

}
export default Testimonials