import React, {useEffect, useState} from "react";
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import './Carousel.css'
import images from "../../constants/images";
import {useDispatch, useSelector} from "react-redux";
import {listGallery} from "../../actions/galleryActions";
import Loader from "../../components/Loader";
import Message from "../../components/Message";


function Carousel() {
   const dispatch = useDispatch();
    const galleryList = useSelector(state => state.galleryList)
    const {error,loading,gallery} = galleryList

    useEffect(()=>{
        dispatch(listGallery())


    }, [dispatch])



  return (
      <div className="page_style_gallery">
          <h1 className='my_titles_gallery'>Image Gallery</h1>
            <video id="background-video" autoPlay loop muted poster="https://assets.codepen.io/6093409/river.jpg">
                            <source src={images.my_backG}/>
          </video>
          {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    :
                  (
                      <AliceCarousel
               className='my_alice'
               autoPlay autoPlayInterval="3000"
               autoPlayDirection="rtl"
               infinite
>
      {gallery.map(gallery=>(
                    <div key={gallery._id}>
                        <div className='my_gallery_centre'>
                      <img className='sliderimg' src={gallery.image}  alt='si'/>

                        </div>

                    </div>
                ))}


</AliceCarousel>

                  )
          }

      </div>

  );
}

export default Carousel;
