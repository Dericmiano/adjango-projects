import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// import {motion} from "framer-motion";
import './About..scss'
import {images} from "../../constants";

function About() {


    return(
        <div className="about_outer_div">
        <div className="main_about">
            <div className='header'>
                <h2  className='head-text'>Why choose us</h2>
            </div>

            <div className='container_about'>

                <div className='items_about'>
                    <div className="img1">

                         <img src={images.top_quality} className="image"/>

                    </div>

                    <h2 className='definition'>High Quality</h2>
                        <p className="description">High quality is our key goal for our customers</p>


                </div>
                 <div className='items_about'>
                     <div className="img1">
                         <img src={images.expertise} className="image"/>

                     </div>

                    <h2 className='definition'>Expertise Professionals</h2>
                        <p className="description">Our employees are the best in our work </p>


                </div>
                 <div className='items_about'>
                     <div className="img1">
                            <img src={images.affordable} className="image"/>

                     </div>

                    <h2 className='definition'>Affordable</h2>
                        <p className="description">Our services are affordable to
                            every one and also quality assurance is key</p>


                </div>
                 {/*<div*/}
                 {/*     whileInView={{opacity : 1}}*/}
                 {/*       whileHover={{scale : 1.1}}*/}
                 {/*       transition={{duration : 0.5, type: 'tween'}}*/}

                 <div className='items_about'>
                     <div className="img1">
                         <img src={images.longLasting} className="image"/>

                     </div>

                    <h2 className='definition'>Long lasting</h2>
                        <p className="description">Our materials are long lasting and strong</p>


                </div>
                 <div className='items_about'>
                     <div className="img1">
                         <img src={images.friendly} className="image"/>

                     </div>

                    <h2 className='definition'>Satisfactory</h2>
                        <p className="description">Our company ensures that
                            clients are well satisfied with their needs</p>


                </div>
            </div>
           </div>



        </div>
    )

}
export default About;