import React from 'react';
import { BsTwitter, BsInstagram } from 'react-icons/bs';
import { FaFacebookF } from 'react-icons/fa';


const SocialMedia = () => {
    return(
        <div className="app__social">
            <div>
                <a href="https://mobile.twitter.com/Deric68724797"><BsTwitter/></a>
            </div>
            <div>
                <a href="https://web.facebook.com/dericoh.milano"><FaFacebookF/></a>
            </div>
            <div>
               <a href="https://www.instagram.com/dericmiano/"><BsInstagram/></a>
            </div>

        </div>
    )

}
export default SocialMedia;