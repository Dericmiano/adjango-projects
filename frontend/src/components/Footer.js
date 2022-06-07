import React from "react";
import {Container, Row, Col, Button} from "react-bootstrap";
import '../container/Footer.scss'
import SocialMedia from "./SocialMedia";
import images from "../constants/images";


function Footer() {
    return(
        <footer>
                                                                     <div className='text_one_footer'>
                               <img className='my_logo_footer' src={images.newlogo1} />

                    </div>

            <div className='main__footer'>

                <div>

                    <h2 className='cont'>
                        <hr className='hr_top'/>
                        Call us for an appointment +254 723 747879
                    </h2>
                     <div className="button_team">
                    <Button>
                        <h4 className='tes'>BOOK APPOINTMENT</h4>
                </Button>
                     </div>
                    <hr className='hr_bottom'/>
                </div>
                <div >
                    <h2 className="cont2">
                        ROSTERS , NAIROBI <br/>
                        OPPOSITE, THIKA ROAD - <br/>
                    </h2>
                    <p className='mail'>
                       stichhighquality@gmail.com<br/>
                        Mon - Fri 8am - 8pm
                    </p>
                    <SocialMedia/>

                </div>

                <Container>
                <Row>
                    <Col className='text-center py-3'>
                        Copyright &copy; stichhighquality2021
                    </Col>
                </Row>
            </Container>


            </div>



        </footer>
    )

}
export default Footer