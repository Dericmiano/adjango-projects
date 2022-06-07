import React from "react";
import 'react-slideshow-image/dist/styles.css'
import {Fade} from "react-slideshow-image";
import images from "../../constants/images";
// import {motion} from "framer-motion";

import './Home.scss'
import SocialMedia from "../../components/SocialMedia";

const Home = () => {
    const fadeProperties = {
    scale:0.4,
    autoplay:true,
    duration: 2000,
    transitionDuration: 500,
    infinite: true,
    // indicators: true,
    onChange: (oldIndex, newIndex) => {
        console.log(`fade transition from ${oldIndex} to ${newIndex}`);
    }
}

    return(

            <div className="slide-container">
            <Fade {...fadeProperties}>
                <div className="each-fade">
                    <div className="image-container">
                        <img className='my_image_home' src={images.image13} />
                    </div>
                    <div className='text_one'>
                               <img className='my_logo_home' src={images.newlogo2} />

                    </div>

                    <h3>ROSTERS OPPOSITE THIKA ROAD,  NAIROBI,
                   +254 723 747879</h3>
                     <h2>Explore your <br/>Pro Dream Machine</h2>
                    <div className="text">
                        <div className='btn'><SocialMedia/></div>
                    </div>
                </div>
                <div className="each-fade">
                    <div className="image-container">
                        <img src={images.image11_home} />
                    </div>
                     <div className='text_one'>
                               <img className='my_logo_home' src={images.newlogo2} />

                    </div>
                 <h3>ROSTERS OPPOSITE THIKA ROAD,  NAIROBI,

                  +254 723 747879</h3>
                     <h2>Explore your <br/>Pro Dream Machine</h2>
                        <div className="text">
                        <div className='btn'><SocialMedia/></div>

                    </div>
                </div>
                <div className="each-fade">
                    <div className="image-container">
                        <img src={images.image101} />
                    </div>
                     <div className='text_one'>
                               <img className='my_logo_home' src={images.newlogo2} />

                    </div>
                <h3>ROSTERS OPPOSITE THIKA ROAD,  NAIROBI,
                   +254 723 747879</h3>
                     <h2>Explore your <br/> Pro Dream Machine</h2>
                     <div className="text">
                    <div className='btn'><SocialMedia/></div>


                    </div>

                </div>
                <div className="each-fade">
                    <div className="image-container">

                        <img
                            whileInView={{  scale: [0, 1]}}
                                transition={{duration: 1, ease:'easeInOut'}}
                            src={images.image6}/>
                    </div>
                     <div className='text_one'>
                               <img className='my_logo_home' src={images.newlogo2} />

                    </div>
                    <h3>ROSTERS OPPOSITE THIKA ROAD,  NAIROBI,
                     +254 723 747879</h3>
                     <h2>Explore your <br/> Pro Dream Machine</h2>
                     <div className="text">
                          <div className='btn'><SocialMedia/></div>

                        {/*<button className="btn">BOOK APPOINTMENT</button>*/}
                    </div>

                </div>
                <div className="each-fade">
                    <div className="image-container">
                        <img src={images.image15a}/>
                    </div>
                     <div className='text_one'>
                               <img className='my_logo_home' src={images.newlogo2} />

                    </div>
                   <h3>ROSTERS OPPOSITE THIKA ROAD,  NAIROBI,
                     +254 723 747879</h3>

                     <h2>Explore your <br/>Pro Dream Machine</h2>
                     <div className="text">
                        <div className='btn'><SocialMedia/></div>

                        {/*<button className="btn">BOOK APPOINTMENT</button>*/}

                    </div>

                </div>

            </Fade>


        </div>


    )


}
export default Home;